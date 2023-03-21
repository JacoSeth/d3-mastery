async function draw() {
    const dataset = await d3.csv('data.csv')
    const date = d => d.date
    const price = d => d.close

    let dimensions = {
        width: 1000,
        height: 500,
        margins: 50
    }

    containerWidth = dimensions.width - dimensions.margins * 2
    containerHeight = dimensions.height - dimensions.margins * 2

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)

    const container = svg.append('g')
        .attr('transform', `translate(${dimensions.margins}, ${dimensions.margins})`)

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, price))
        .range([containerHeight, 0])
        .nice()
}

draw()