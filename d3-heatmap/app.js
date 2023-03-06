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
    const box = dimensions.width / boxesInRow

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
        .attr('width', box - 3)
        .attr('height', box - 3)
        // Lining up boxes along x axis in columns of 20
        .attr('x', (d, i) => box * (i % boxesInRow))
        // Stacking boxes along y axis in rows
        .attr('y', (d, i) => box * ((i / boxesInRow) | 0))
        // Add fill and pass in colorScale as the argument
        .attr('fill', colorScale)


}

draw('#heatmap1', 'linear')
draw('#heatmap2', 'quantize')
draw('#heatmap3', 'quantile')
draw('#heatmap4', 'threshold')




`Simple answer: only depends on how the company is structured. If CaucusRoom is a subsidiary. It is privately held and a limited partnership.  Parent is protected in the event of some kind of litigation.

Not many companies hold alternative assets
List: 

Investors find company that will hold custodianship
Trust company who holds alternative assets (private stock)
Annual, semiannual or quarterly valuations: need RMDH

Bonds & market are likely to crash.  CaucusRoom is a chance to place your money somewhere safe that isn't affected by the public sentiment or anything like that

If we can get core investors interested in this to where they maybe help others get on, that would help expand the base.

opening a door to another revenue stream AND solo 401(k) plans can also invest

C&B Bank 
Pine Ridge Investment - Harry Geldermann

Since the stock market is gonna take a shit:
Let investors know that 


Fees are high for companies to do this because it is all manual


____Equity

Once we know what it is, go to pacificpremieretrust.com. 1) private equity investment authorization form and 2) debt authorization form.  See what it would take for them to hold CaucusRoom within and IRA as a custodian

Will check for the following: 
is it in good standing? etc

Any custodian will do this: they will look not to tell you if its okay by the IRS. All they are looking for is to make sure that this is something they are comfortable being the custodian of, so that if the IRS audits or anything else, they can be prepared.  FIServe held a ton of Bernie Madoff and was protected by this.  Custodians do not do due diligence, etc. 

With private equity, you have an equity ownership in shares. You hold it within an IRA and in order to trade (because it is private), you need a secondary market. Staff needs to be very wary that you aren't trading on insider info. 

If you're an employee of the corporation, you can't own more that 49% of the shares or debt of the LLC. Cannot have a controlling share.



____Debt

IRA holder loans 10k to the company and gets a note (convertible note)
Check goes from IRA to company at an interest rate
Company has to be an LLC in good standing (articles of incorporation, etc)
Note will come due ~ 5yrs from today's date (principal and interest due at that time)

`