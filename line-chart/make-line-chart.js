function makeLineChart(context) {
    const { genre, year } = context;

    // Title
    let title = "Tren banyak pemain Steam • " + year;
    if (genre != "")    // If all genre selected, change if needed
    {
        title = "Tren banyak pemain Steam • Genre " + genre + " • " + year;
    }
    const lineChartTitle = lineChartSection.select("#line-chart-title");
    const previousTitle = lineChartTitle.text();
    
    if (previousTitle == title) return; // No need to transition, right?
    typingAnimation(lineChartTitle, previousTitle, title);

    function typingAnimation(textElement, previousTitle, nextTitle) {
        let currentTitle = String(previousTitle);
        
        const titleTransitions = [currentTitle.concat("_")];
        while (!nextTitle.startsWith(currentTitle)) {
            currentTitle = currentTitle.substring(0, currentTitle.length - 1);
            titleTransitions.push(currentTitle.concat("_"));
        }
        
        /* Extra wait */
        titleTransitions.push(currentTitle.concat("_"));
        titleTransitions.push(currentTitle.concat("_"));
        titleTransitions.push(currentTitle.concat("_"));

        while (currentTitle != nextTitle) {
            currentTitle = nextTitle.substring(0, currentTitle.length + 1);
            titleTransitions.push(currentTitle.concat("_"));
        }
    
        textElement
            .transition()
            .duration(50 * titleTransitions.length)
            .ease(d3.easeLinear)
            .textTween(() => t => {
                if (t < 1) {
                    const index = Math.floor(t * titleTransitions.length);
                    return titleTransitions[index];
                } else {
                    return nextTitle;
                }
            });
    }

    // Delete previous line chart
    lineChart.selectAll("*").remove();

    // Set overall size
    const x = d3.scaleTime()
        .range([0, lineWidth - lineMargin.left - lineMargin.right]);

    const y = d3.scaleLinear()
        .range([lineHeight - lineMargin.top - lineMargin.bottom, 20]);

    getLineChartData(context).then(displayedData => {
        // Line chart scaling
        x.domain(d3.extent(displayedData, d => d.date));
        y.domain([0, d3.max(displayedData, d => d.value)]);
        
        // The X axis
        const XAxis = lineChart.append("g")
            .attr("transform", `translate(0, ${lineHeight - lineMargin.top - lineMargin.bottom})`)
            .style("font-size", lineFontSize)
            .call(d3.axisBottom(x)
                .ticks(d3.timeMonth.every(1))
                .tickFormat(d3.timeFormat("%b %Y"))
                .tickSize(0)
                .tickPadding(10)
                )
            .call(g => g.select(".domain").remove()) 
            .selectAll(".tick text")
            .style("fill", "#e0e0e0")
            .attr("opacity", 0);

        // The Y axis
        const YAxis = lineChart.append("g")
            .style("font-size", lineFontSize + 4)
            .call(d3.axisLeft(y)
                .ticks(8)
                .tickFormat(d => {
                    return `${(d / 1000000).toFixed(1)} Jt`;
                })
                .tickSize(0)
                .tickPadding(10)
                )
            .call(g => g.select(".domain").remove()) 
            .selectAll(".tick text")
            .style("fill", "#e0e0e0") 
            .style("visibility", (d, i, nodes) => {
                if (i === 0) {
                    return "hidden"; 
                } else {
                    return "visible"; 
                }
            })
            .attr("opacity", 0);

        // Add vertical gridlines
        const XGrid = lineChart.selectAll("xGrid")
            .data(x.ticks())
            .join("line")
            .attr("x1", d => x(d))
            .attr("x2", d => x(d))
            .attr("y1", 0)
            .attr("y2", lineHeight - lineMargin.top - lineMargin.bottom)
            .attr("stroke", "#e0e0e0")
            .attr("stroke-width", 0);

        // // Add horizontal gridlines
        const YGrid = lineChart.selectAll("yGrid")
            .data(y.ticks(8).slice(1))
            .join("line")
            .attr("x1", 0)
            .attr("x2", lineWidth)
            .attr("y1", d => y(d))
            .attr("y2", d => y(d))
            .attr("stroke", "#e0e0e0")
            .attr("stroke-width", 0)

        // Add Y-axis label
        lineChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - lineMargin.left)
            .attr("x", 0 - ((lineHeight - lineMargin.top - lineMargin.bottom) / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", lineFontSize)
            .style("fill", "#e0e0e0")
            .style("font-family", "sans-serif")
            .text("Jumlah Pemain");

        // Add X-axis label
        lineChart.append("text")
            .attr("x", (lineWidth - lineMargin.left - lineMargin.right) / 2)
            .attr("y", 0 + lineHeight - lineMargin.bottom)
            .attr("text-anchor", "middle")
            .style("font-size", lineFontSize)
            .style("fill", "#e0e0e0")
            .text("Waktu");

        // Draw the line
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        const path = lineChart.append("path")
            .datum(displayedData)
            .attr("d", line)
            .attr("stroke", "#137EB0")
            .attr("stroke-width", 4)
            .attr("fill", "none")

        // For animating
        XAxis
            .transition()
            .duration(600)
                .attr("opacity", 1);

        YAxis
            .transition()
            .duration(1200)
                .attr("opacity", 1);

        XGrid
            .transition()
            .duration(2400)
                .attr("stroke-width", .2);

        YGrid
            .transition()
            .duration(1800)
                .attr("stroke-width", .4);

        var totalLength = path.node().getTotalLength();
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2400)
                .attr("stroke-dashoffset", 0);
        //

        // Tooltip
        // Add a circle element
        const circle = lineChart.append("circle")
            .attr("r", 0)
            .attr("fill", "#137EB0")
            // .style("stroke", "white")
            .attr("opacity", .70)
            .style("pointer-events", "none");

        // create a listening rectangle
        const listeningRect = lineChart.append("rect")
            .attr("width", lineWidth)
            .attr("height", lineHeight)
            .attr("pointer-events", "all")
            .attr("fill-opacity", "0")
            .attr("stroke-opacity", "0")
            .attr("z-index", "1");

        // create the mouse move function
        listeningRect.on("mousemove", function (event) {
            const [xCoord] = d3.pointer(event, this);
            const bisectDate = d3.bisector(d => d.date).left;
            const x0 = x.invert(xCoord);
            const i = bisectDate(displayedData, x0, 1);
            const d0 = displayedData[i - 1];
            const d1 = displayedData[i];
            const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            const xPos = x(d.date);
            const yPos = y(d.value);

            // Update the circle position
            circle.attr("cx", xPos)
                .attr("cy", yPos);

            // Add transition for the circle radius
            circle.transition()
                .duration(50)
                .attr("r", 5);

            // add in  our tooltip
            tooltip
                .style("display", "block")
                .style("left", `${Math.max(240, Math.min(1200, xPos + lineMargin.left))}px`)
                .style("top", `${yPos + lineHeight + lineMargin.top + lineMargin.bottom + 40}px`)
                .html(`<strong>Waktu:</strong> ${d.date.toLocaleDateString("id-ID",{month: "long", year: "numeric"})}<br><strong>Jumlah Pemain:</strong> ${d.value !== undefined ? (d.value).toLocaleString() : 'N/A'}`)
            });

        // listening rectangle mouse leave function
        listeningRect.on("mouseleave", function () {
            circle.transition()
                .duration(50)
                .attr("r", 0);

            tooltip.style("display", "none");
        });
        //

    });
}
