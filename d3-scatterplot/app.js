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


    // Scales
    const cxScale = d3.scaleLinear()
        .domain(d3.extent(dataset, cxAccessor))
        .range([10, dimensions.ctrWidth])

    const cyScale = d3.scaleLinear()
        .domain(d3.extent(dataset, cyAccessor))
        .range([10, dimensions.ctrHeight])

    container.selectAll('circle')
        .data(dataset)
        .join('circle')
        // using accessor functions to tap needed datapoints for our circle coordinates
        // As a reminder, the independent variable (cause) is generally plotted on the x-axis while the
        // dependendent variable (effect) is plotted on the y-axis
        .attr('cx', d => cxScale(cxAccessor(d)))
        .attr('cy', d => cyScale(cyAccessor(d)))
        // circles won't show until we add r attribute
        .attr('r', 5)
        .attr('fill', 'purple')
        .attr('fill-opacity', '35%')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', '1.0')
        .attr('stroke-alignment', 'outer')

}


drawScatterPlot()