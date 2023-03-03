// // Using d3.select() to manipulate the DOM
// const d3Selection = d3.select("body").append('p')

// console.log(d3Selection)

// // Using chaining & functions to manipulate selections
// const el = d3.select("body")
//     .append("p")
//     // use .attr to assign only one class
//     .attr("class", "p-body")
//     // use .classed to assign a running list of classes. Call .classed first OR after calling .attr("class")
//     .classed("foo", true)
//     .classed("bar", true)
//     // set boolean to false to remove the class, true to add it again
//     .classed("bar", false)
//     // use .style() to set things like color
//     .style("color", "purple")
//     // use .text() to set text for the element
//     .text("Hi Everybody")

// console.log(el)

// // Joining Data
// // The process of associating a piece of data with an element is known as joining data.
// // be sure to set parent element before using .join() so newly created elements will be added/removed to the parent element
// // .join() handles the problem of to few or too many elements. There will be exactly 1 element for each index in data.

// const data = [10, 20, 30, 40, 50]
// const elli = d3.select('ul')
//     .selectAll('li')
//     .data(data)
//     .join(
//         enter => {
//             return enter.append('li')
//                 .style('color', 'green')
//         },
//         update => update.style('color', 'purple')
//     )
//     .text(d => d)

// console.log(elli)

// Fetch JSON with d3
// Use async and await syntax for best practices with promises 

async function getData() {
    const data = await d3.json('data.json')
    console.log(data)
}

getData()

async function getCSV() {
    const data = await d3.csv('data.csv')
    console.log(data)
}

getCSV()