async function draw() {
    // Data
    const dataset = await d3.csv('data.csv', (d) => {
        d3.autoType(d)

        return d
    })

    // Dimensions
    let dimensions = {
        width: 1000,
        height: 600,
        margins: 20,
    };

    dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
    dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

    // Draw Image
    const svg = d3.select('#chart')
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)

    const ctr = svg.append("g")
        .attr(
            "transform",
            `translate(${dimensions.margins}, ${dimensions.margins})`
        )

    // Scales

    // getting the data to stack, and using the keys function to assign the key categories
    const stackGenerator = d3.stack()
        .keys(dataset.columns.slice(1))

    const stackData = stackGenerator(dataset).map(ageGroup => {
        ageGroup.forEach(state => state.key = ageGroup.key)
        return ageGroup
    })

    // create yScale
    const yScale = d3.scaleLinear()
        // for domain, we need the largest number in the dataset. So we are finding the largest number in each of 9 categories, 
        // then comparing them to eachother to find the largest overall
        .domain([
            0, d3.max(stackData, ag => d3.max(ag, s => s[1]))
        ])
        // Range equals the height of the container minus the margins
        .rangeRound([dimensions.ctrHeight, dimensions.margins])

    const xScale = d3.scaleBand()
        .domain(dataset.map(state => state.name))
        .range([dimensions.margins, dimensions.ctrWidth])

    // Color Scale 
    const colorScale = d3.scaleOrdinal()
        .domain(stackData.map(d => d.key))
        .range(d3.schemeSpectral[stackData.length])
        .unknown("#ccc")

    // Draw Bars
    const ageGroups = ctr.append('g')
        .classed('age-groups', true)
        .selectAll('g')
        .data(stackData)
        .join('g')
        .attr("fill", d => colorScale(d.key))


    // Complicated shape join for bars 
    ageGroups.selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', d => xScale(d.data.name))
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0] - yScale(d[1])))
        .attr('width', xScale.bandwidth())
}

draw()