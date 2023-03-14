async function drawScatterPlot() {
    const dataset = await d3.json('weather-data.json')
        // console.log(dataset[0])

    // Define coordinates variables

    const cxAccessor = (d) => d.currently.humidity
    const cyAccessor = (d) => d.currently.apparentTemperature

    const dimensions = {
        width: 800,
        height: 800,
        margin: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
        }
    }

    dimensions.ctrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.ctrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    const svg = d3.select(".chart")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

    const container = svg.append('g')
        .attr(
            "transform",
            `translate (${dimensions.margin.left}, ${dimensions.margin.top})`
        )

    const tooltip = d3.select('#tooltip')

    // Scales
    const cxScale = d3.scaleLinear()
        // domain of the scale is the min & max values of the datapoints in cyAccessor
        .domain(d3.extent(dataset, cxAccessor))
        // round the range to the nearest whole number (no decimals)
        .rangeRound([0, dimensions.ctrWidth])
        // prevent new data from being plotted outside the bounds of the container
        .clamp(true)

    const cyScale = d3.scaleLinear()
        // domain of the scale is the min & max values of the datapoints in cyAccessor
        .domain(d3.extent(dataset, cyAccessor))
        // round the range to the nearest whole number (no decimals)
        // since y needs to be inverted to display low numbers at the base of the chart, always make sure the 
        // max y value is placed first inside rangeRound() argument
        .rangeRound([dimensions.ctrHeight, 0])
        // round the range of the y-scale to nearest decimals
        .nice()
        // prevent new data from being plotted outside the bounds of the container
        .clamp(true)

    container.selectAll('circle')
        .data(dataset)
        .join('circle')
        // using accessor functions to tap needed datapoints for our circle coordinates
        // As a reminder, the independent variable (cause) is generally plotted on the x-axis while the
        // dependendent variable (effect) is plotted on the y-axis
        .attr('cx', d => cxScale(cxAccessor(d)))
        .attr('cy', d => cyScale(cyAccessor(d)))
        .attr('data-temp', cyAccessor)
        // circles won't show until we add r attribute
        .attr('r', 5)
        .attr('fill', 'green')
        .attr('fill-opacity', '35%')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', '1.0')
        .attr('stroke-alignment', 'outer')
        .on('mouseenter', function(e, datum) {
            d3.select(this)
                .attr('fill', '#120078')
                .attr('r', 10)

            tooltip.style('display', 'block')
                .style('top', cyScale(cyAccessor(datum)) - 25 + 'px')
                .style('left', cxScale(cxAccessor(datum)) + 'px')
        })
        .on('mouseleave', function(e, datum) {
            d3.select(this)
                .attr('fill', 'green')
                .attr('r', 5)

            tooltip.style('display', 'none')
        })

    // Define an axis using the scale and d3.axisBottom() or d3.axisTop() functions
    const xAxis = d3.axisBottom(cxScale)
        .ticks(5)
        .tickFormat(d => d * 100 + '%')

    // Create a new group to host the axis lines, shapes, and text
    const xAxisGroup = container.append('g')
        .call(xAxis)
        // Since the axis is on the top by default, move the axis to the bottom
        .style('transform', `translateY(${dimensions.ctrHeight}px)`)
        // Add a class so we can edit text with CSS
        .classed('axis', true)

    // Add text to the x-axis
    xAxisGroup.append('text')
        // Center the text anchor
        .attr('x', dimensions.ctrWidth / 2)
        // Place text 10px below bottom of container
        .attr('y', dimensions.margin.bottom - 10)
        // select color
        .attr('fill', 'black')
        // Set actual text value
        .text('Humidity')
        // Make the text anchor the middle of the text element
        .style('text-anchor', 'middle')

    const yAxis = d3.axisLeft(cyScale)

    const yAxisGroup = container.append('g')
        .call(yAxis)
        // .style("transform", `translateX(${dimensions.ctrWidth}px)`)
        .classed('axis', true)

    yAxisGroup.append("text")
        .attr("x", -dimensions.ctrHeight / 2)
        .attr("y", -dimensions.margin.left + 15)
        .attr("fill", "black")
        .html("Temperature (&deg;F)")
        .style("transform", "rotate(270deg)")
        .style("text-anchor", "end")

}




drawScatterPlot()