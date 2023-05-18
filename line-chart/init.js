const lineWidth = lineChartConfig.lineSvgWidth;
const lineHeight = lineChartConfig.lineSvgHeight;
const lineMargin = lineChartConfig.margin;
const lineFontSize = lineChartConfig.lineBaseFontSize;

const lineChartSection = d3.select("#line-chart-section")
   .attr("preserveAspectRatio", "xMidYMid meet")
   .attr("viewBox", "0 120 1200 420");   // Adjust position here

const lineChart = lineChartSection.select("#line-chart")
    .attr("width", lineWidth).attr("height", lineHeight)
    .append("svg")
        .attr("width", lineWidth).attr("height", lineHeight)
    .append("g")
        .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);

// create tooltip div
const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip");