async function draw() {
    // Data
    const dataset = await d3.csv('data.csv')

    // Dimensions
    let dimensions = {
        width: 600,
        height: 600,
        margins: 10,
    }

    dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
    dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

    const radius = dimensions.ctrWidth / 2

    // Draw Image
    const svg = d3.select('#chart')
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

    const ctr = svg.append("g") // <g>
        .attr(
            "transform",
            `translate(${dimensions.margins}, ${dimensions.margins})`
        )

    // Scales
    const populationPie = d3.pie()
        .value(d => d.value)
        .sort(null)

    const slices = populationPie(dataset)

    const colors = d3.quantize(
        d3.interpolateSpectral,
        dataset.length
    )

    const colorScale = d3.scaleOrdinal()
        .domain(dataset.map(element => element.category))
        .range(colors)

    const arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0)

    const arcLabels = d3.arc()
        .outerRadius(radius)
        .innerRadius(200)

    const arcsGroup = ctr.append('g')
        // Position the pie chart center at the center of the svg
        .attr(
            'transform',
            `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`
        )

    arcsGroup.selectAll('path')
        .data(slices)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => colorScale(d.data.category))

    const labelsGroup = ctr.append('g')
        .attr(
            'transform',
            `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`
        )
        .classed('labels', true)

    labelsGroup.selectAll('text')
        .data(slices)
        .join('text')
        .attr('transform', d => `translate(${arcLabels.centroid(d)})`)
        .call(
            text => text.append('tspan')
            .attr('y', -4)
            .attr('font-weight', 'bold')
            .text(d => d.data.category)
        )
        .call(
            text => text.filter(d => (d.endAngle - d.startAngle > 0.25))
            .append('tspan')
            .attr('x', 0)
            .attr('y', 9)
            .text(d => d.data.value)
        )

}

draw()