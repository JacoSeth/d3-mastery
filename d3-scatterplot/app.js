async function drawScatterPlot() {
    const dataset = await d3.json('weather-data.json')
        // console.log(dataset[0])

    // Define coordinates variables

    const cxAccessor = (d) => d.currently.humidity
    const cyAccessor = (d) => d.currently.apparentTemperature

    const dimensions = {
        width: 1000,
        height: 1000,
        margin: {
            top: 50,
            bottom: 50,
            right: 50,
            left: 50
        }
    }

    const svg = d3.select(".chart")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

    const container = svg.append('g')
        .attr(
            "transform",
            `translate (${dimensions.margin.left}, ${dimensions.margin.top})`
        )

    container.selectAll('circle')
        .data(dataset)
        .join('circle')
        // using accessor functions to tap needed datapoints for our circle coordinates
        // As a reminder, the independent variable (cause) is generally plotted on the x-axis while the
        // dependendent variable (effect) is plotted on the y-axis
        .attr('cx', cxAccessor)
        .attr('cy', cyAccessor)
        // circles won't show until we add r attribute
        .attr('r', 5)
        .attr('fill', 'purple')
        .attr('stroke', 'black')
        .attr('opacity', '50%')
}


drawScatterPlot()