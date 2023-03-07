async function draw(el, scale) {
    // Get data
    const dataset = await d3.json('data.json')
        // Optionally, sort the dataset in asc or desc
    dataset.sort((a, b) => a - b)

    // Define dimensions for chart
    const dimensions = {
        width: 600,
        height: 150
    }

    const boxesInRow = 20

    // variable to define the box length, calculated by dividing the dimensions of the image by
    // how many boxes we want in each row
    const boxLen = dimensions.width / boxesInRow

    // Color Range when needed by scale for buckets
    const colorRange = ['white', 'rgb(153, 204, 204)', 'teal']

    // Draw Image
    const svg = d3.select(el)
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

    // Create Scale for Color
    let colorScale;
    // Four options for scales
    if (scale === 'linear') {
        colorScale = d3.scaleLinear()
            .domain(d3.extent(dataset))
            .range(['white', 'teal'])
    } else if (scale === 'quantize') {
        colorScale = d3.scaleQuantize()
            .domain(d3.extent(dataset))
            .range(colorRange)
    } else if (scale === 'quantile') {
        colorScale = d3.scaleQuantile()
            .domain(dataset)
            .range(colorRange)
    } else if (scale === 'threshold') {
        colorScale = d3.scaleThreshold()
            .domain([45200, 135600])
            .range(colorRange)
    }


    // draw squares for heat map
    svg.append('g')
        .attr('transform', 'translate(2,2)')
        .attr('stroke', 'black')
        .selectAll('rect')
        .data(dataset)
        .join('rect')
        .attr('width', boxLen - 3)
        .attr('height', boxLen - 3)
        // Lining up boxes along x axis in columns of 20
        .attr('x', (d, i) => boxLen * (i % boxesInRow))
        // Stacking boxes along y axis in rows
        .attr('y', (d, i) => boxLen * ((i / boxesInRow) | 0))
        // Add fill and pass in colorScale as the argument
        .attr('fill', colorScale)
        // .classed('box', true)
        .attr('rx', 30)


}

draw('#heatmap1', 'linear')
draw('#heatmap2', 'quantize')
draw('#heatmap3', 'quantile')
draw('#heatmap4', 'threshold')