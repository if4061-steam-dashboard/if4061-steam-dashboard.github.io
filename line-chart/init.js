const lineWidth = lineChartConfig.lineSvgWidth;
const lineHeight = lineChartConfig.lineSvgHeight;
const lineMargin = lineChartConfig.margin;
const lineFontSize = lineChartConfig.lineBaseFontSize;

const lineChartSection = d3.select("#line-chart-section")
   .attr("preserveAspectRatio", "xMidYMid meet")
   .attr("viewBox", "0 80 1100 420");   // Adjust position here

const lineChart = lineChartSection.select("#line-chart")
    .attr("width", lineWidth).attr("height", lineHeight)
    .append("svg")
        .attr("width", lineWidth).attr("height", lineHeight)
    .append("g")
        .attr("transform", `translate(${lineMargin.left}, ${lineMargin.top})`);