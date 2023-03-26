async function draw() {
    const dataset = await d3.csv('data.csv')

    const parseDate = d3.timeParse("%Y-%m-%d")
    const date = d => parseDate(d.date)
    const price = d => parseInt(d.close)

    let dimensions = {
        width: 1000,
        height: 500,
        margins: 50
    }

    containerWidth = dimensions.width - dimensions.margins * 2
    containerHeight = dimensions.height - dimensions.margins * 2

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

    const container = svg.append('g')
        .attr('transform',
            `translate(${dimensions.margins}, ${dimensions.margins})`)

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, price))
        .range([containerHeight, 0])
        .nice()


    // Using scaleUtc to convert a datetime obj to utc time 
    const xScale = d3.scaleTime()
        .domain(d3.extent(dataset, date))
        .range([0, containerWidth])
        .nice()

    // Creating a line generator to draw the data from our line
    const lineGenerator = d3.line()
        .x(d => xScale(date(d)))
        .y(d => yScale(price(d)))

    container.append("path")
        .datum(dataset)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "#30475e")
        .attr("stroke-width", 2)

    // Adding the axis
    const yAxis = d3.axisLeft(yScale)
        .tickFormat(d => `$${d}`)

    container.append('g').call(yAxis)

    const xAxis = d3.axisBottom(xScale)

    container.append('g')
        .call(xAxis)
        .style('transform', `translateY(${containerHeight}px)`)

}


draw()