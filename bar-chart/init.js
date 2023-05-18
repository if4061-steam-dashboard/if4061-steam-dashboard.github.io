const barChartSection = d3.select("#bar-chart-section")
   .attr("preserveAspectRatio", "xMidYMid meet")
   .attr("viewBox", "0 0 1200 450");

const barChart = barChartSection.select("#bar-chart");

const defs = barChart.append("defs");
const barGradient = defs.append("linearGradient")
    .attr("id", "barGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

barGradient.append("stop")
    .attr("offset", "0%")
    .attr("style", "stop-color:rgb(255, 255, 255); stop-opacity:0");

barGradient.append("stop")
    .attr("offset", "100%")
    .attr("style", "stop-color:rgb(255, 255, 255); stop-opacity:1");

