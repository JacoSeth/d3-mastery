async function draw() {
    // Data
    const dataset = await d3.json('weather-data.json')

    // Dimensions
    let dimensions = {
        width: 800,
        height: 400,
        margins: 50
    };

    dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
    dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

    // Draw Image
    const svg = d3.select('.chart')
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

    const ctr = svg.append("g") // <g>
        .attr(
            "transform",
            `translate(${dimensions.margins}, ${dimensions.margins})`
        )

    const labelsGroup = ctr.append('g')
        .classed('bar-labels', true)

    const xAxisGroup = ctr.append('g')
        // moving axis to the bottom of the graph
        .style('transform', `translateY(${dimensions.ctrHeight}px)`)


    function histogram(metric) {
        const xAccessor = d => d.currently[metric]
        const yAccessor = d => d.length

        const xScale = d3.scaleLinear()
            .domain(d3.extent(dataset, xAccessor))
            .range([0, dimensions.ctrWidth])
            .nice()

        // Creating a bin to group numbers of any interval into buckets
        const bin = d3.bin()
            // Call the domain object of the scale rather than rewriting it
            .domain(xScale.domain())
            // Choose what to bin, in this case the humidity
            .value(xAccessor)
            // Set the thresholds
            .thresholds(10)

        // Binning mutates the data into a new dataset, so we need to call the new dataset now
        const newDataSet = bin(dataset)

        // Additional padding to be used
        const padding = 3

        // Adding a y scale to define y and height
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(newDataSet, yAccessor)])
            .range([dimensions.ctrHeight, 0])
            .nice()

        // Storing a transtition to be called later
        const exitTransition = d3.transition().duration(500)
        const updateTransition = d3.transition()

        // Draw Bars
        ctr.selectAll('rect')
            .data(newDataSet)
            .join(
                (enter) => enter.append('rect')
                .attr('width', d => d3.max([0, xScale(d.x1) - xScale(d.x0) - padding]))
                .attr("height", 0)
                .attr('x', d => xScale(d.x0))
                .attr("y", dimensions.ctrHeight)
                .attr('fill', '#b8de6f'),
                (update) => update,
                (exit) => exit.attr('fill', 'maroon')
                .transition(exitTransition)
                .attr('y', dimensions.ctrHeight)
                .attr('height', 0)
                .remove()
            )
            .transition()
            .duration(1500)
            .attr('width', d => d3.max([0, xScale(d.x1) - xScale(d.x0) - padding]))
            // height: find starting point by taking container height and subtracting the height of the bar.
            // then from that point, draw down to fill the chart until it hits zero
            .attr('height', d => dimensions.ctrHeight - yScale(yAccessor(d)))
            .attr('x', d => xScale(d.x0))
            // Find the y-coordinate of the bar by scaling the length of each group (bucket)
            .attr('y', d => yScale(yAccessor(d)))
            .attr('fill', '#01c5c4')

        // Adding Labels
        labelsGroup.selectAll('text')
            .data(newDataSet)
            .join(
                enter => enter.append('text')
                .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
                .attr("y", dimensions.ctrHeight)
                .text(yAccessor),
                update => update,
                exit => exit.transition(exitTransition)
                .attr("y", dimensions.ctrHeight)
                .remove()
            )
            .transition(updateTransition)
            .duration(2000)
            // for each text, the x-coordinate equals x0 + (x1 -x0) / 2 (center of the bar)
            // first x0 indicates the starting point for each bar. Then the second equation 
            // (x1 - x0)/2 plots the middle of the rect
            .attr('x', d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
            .attr('y', d => yScale(yAccessor(d)) - 10)
            .text(yAccessor)

        // Adding an axis
        const xAxis = d3.axisBottom(xScale)

        xAxisGroup.transition()
            .call(xAxis)

        // Draw Mean Line
        const meanLine = ctr.append('line')
            .classed('mean-line', true)

        const mean = d3.mean(dataset, xAccessor)

        // Draw the mean line with the x,y coordinates
        meanLine.raise()
            .transition(updateTransition)
            .attr("x1", xScale(mean))
            .attr("y1", 0)
            .attr("x2", xScale(mean))
            .attr("y2", dimensions.ctrHeight)

    }


    d3.select('#metric').on('change', function(e) {
        e.preventDefault()
        histogram(this.value)
    })

    // call histogram

    histogram('humidity')
}

draw()