// The url with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
// const url = "/api/data"
// Display the default plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of id names
        let names = data.names;

        // Iterate through the names Array
        names.forEach((name) => {
            // Append each name as an option to the drop down menu
            // This is adding each name to the html file as an option element with value = a name in the names array
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Assign the first name to name variable
        let name = names[0];

        // Call the functions to make the demographic panel, bar chart, and bubble chart
        demo(name);
        bar(name);
        // bubble(name);
        gauge(name);
    });
}

// Make the demographics panel
function demo(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]
        
        // Clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        // Object.entries() is a built-in method in JavaScript 
        // This returns an array of a given object's own enumerable property [key, value]
        let entries = Object.entries(obj);
        
        // Iterate through the entries array
        // Add a h5 child element for each key-value pair to the div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);
    });
  }
  

// Make the bar chart
function bar(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of sample objects
        let samples = data.samples;

        // Filter data where id = selected value 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);

        // Assign the first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the horizontal bar chart
        let trace = [{
            // Slice the top 10 otus
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "#A51C42"
            },
            orientation: "h"
        }];

        let layout = {
            title: {
                text: "<b>Price range</b><br>(in CAN $)",
                font: { size: 24 },
                pad: { b: 20 } // Add padding to the bottom of the title
            }
        };
        
        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", trace, layout);
    });
}
  
// Make the bubble chart
// function bubble(selectedValue) {
//     // Fetch the JSON data and console log it
//     d3.json(url).then((data) => {

//         // An array of sample objects
//         let samples = data.samples;
    
//         // Filter data where id = selected value 
//         let filteredData = samples.filter((sample) => sample.id === selectedValue);
    
//         // Assign the first object to obj variable
//         let obj = filteredData[0];
        
//         // Trace for the data for the bubble chart
//         let trace = [{
//             x: obj.otu_ids,
//             y: obj.sample_values,
//             text: obj.otu_labels,
//             mode: "markers",
//             marker: {
//                 size: obj.sample_values,
//                 color: obj.otu_ids,
//                 colorscale: "Sunset"
//             }
//         }];
    
//         // Apply the x-axis lengend to the layout
//         let layout = {
//             xaxis: {title: "OTU ID"}
//         };
    
//         // Use Plotly to plot the data in a bubble chart
//         Plotly.newPlot("bubble", trace, layout);
//     });
// }

// Make the gauge chart 
function gauge(selectedValue) {
    // Fetch the JSON data and console log it 
    d3.json(url).then((data) => {
        // An array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]

        // Trace for the data for the gauge chart
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Alcohol by Volume</b><br>(in %)", font: {size: 24}},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: "rgb(76,189,157)"},
                steps: [
                    { range: [0, 1], color: "rgb(238,234,210)" },
                    { range: [1, 2], color: "rgb(232,227,196)" },
                    { range: [2, 3], color: "rgb(227,220,182)" },
                    { range: [3, 4], color: "rgb(222,213,168)" },
                    { range: [4, 5], color: "rgb(216,206,154))" },
                    { range: [5, 6], color: "rgb(211,200,139)" },
                    { range: [6, 7], color: "rgb(205,193,125)" },
                    { range: [7, 8], color: "rgb(200,186,111)" },
                    { range: [8, 9], color: "rgb(194,179,97)" },
                    { range: [9, 10], color: "rgb(189,172,83)" }
                ]
            }
        }];

         // Use Plotly to plot the data in a gauge chart
         Plotly.newPlot("gauge", trace);
    });
}

// Toggle to new plots when option changed
function optionChanged(selectedValue) {
    demo(selectedValue);
    bar(selectedValue);
    // bubble(selectedValue);
    gauge(selectedValue)
}

init();