// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metadata = data.metadata;
  
    // Filter the metadata for the object with the desired sample number
    function dataFilter(row) {
      return row.id == sample
    };
    let meta_filter = metadata.filter(dataFilter)[0];
    //console.log(meta_filter)

    // Use d3 to select the panel with id of `#sample-metadata`
   let panel = d3.select('#sample-metadata');
    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

    for (let key in meta_filter) {
    panel.append('p').text(`${key.toUpperCase()}: ${meta_filter[key]}`)
 
    };

  });
};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    function sampleFilter(row) {
      return row.id == sample
    };
    let sample_filter = samples.filter(sampleFilter)[0];
    //console.log(sample_filter)

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sample_filter.otu_ids
    let otu_labels = sample_filter.otu_labels
    let sample_values = sample_filter.sample_values
   
    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      text: otu_labels,
      marker: {
        color: otu_ids,
        size: sample_values
      }
  
    };

    let bubble_data = [trace1];

    let bubble_layout = {
      title: "Bacteria Cultures per Sample",
      xaxis:{
        title:"OTU ID"},
      yaxis: {
        title: "Number of Bacteria"
      },
      height: 500,
      width: 900,

    };
    // Render the Bubble Chart
    Plotly.newPlot('bubble',bubble_data, bubble_layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let string_otu = otu_ids.map(data => String(`OTU ${data}`));
  
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 = {
      x: sample_values.slice(0,10).reverse(),
      y: string_otu.slice(0,10).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let bar_layout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis:{
        title:"Number of Bacteria"},
      height: 500,
      width: 800,
     
  
    };

    let bar_data = [trace2];
    // Render the Bar Chart
    Plotly.newPlot('bar', bar_data, bar_layout);


  });
};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const ids = data.names;
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
  for (let i = 0; i < ids.length; i++) {
    id = ids[i]
    dropdown.append('option').text(id)
  };

    // Get the first sample from the list
  let sample = ids[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(sample)
    buildCharts(sample)
  });
};

// Function for event listener

function optionChanged(newSample) {

  buildMetadata(newSample)
  buildCharts(newSample)
  // Build charts and metadata panel each time a new sample is selected

};

// Initialize the dashboard
init();
