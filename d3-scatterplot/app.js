async function drawScatterPlot() {
    const dataset = await d3.json('weather-data.json')
        // console.log(dataset[0])

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

    container.append('circle')
        .attr('r', 15)
}


drawScatterPlot()