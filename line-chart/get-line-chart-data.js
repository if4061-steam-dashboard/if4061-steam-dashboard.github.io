async function getLineChartData(context) {
    const { genre, year } = context;
    
    // Data array & setting start/end of data
    let displayedData = [];
    let startTimeAttribute;
    let endTimeAttribute;

    if (year == "2019")
    {
        startTimeAttribute = new Date("2019-01-01");
        endTimeAttribute = new Date("2019-12-01");
    }
    else if (year == "2020")
    {
        startTimeAttribute = new Date("2019-12-01");
        endTimeAttribute = new Date("2020-12-01");
    }
    else if (year == "2021")
    {
        startTimeAttribute = new Date("2020-12-01");
        endTimeAttribute = new Date("2021-12-01");
    }
    else if (year == "2022")
    {
        startTimeAttribute = new Date("2021-12-01");
        endTimeAttribute = new Date("2022-12-01");
    }
    
    await d3.csv(aggregated_dataset_path, function(d, i) {
        
        let allGenre = false;
        if (genre == "")    // If all genre selected, change if needed
        {
            allGenre = true;
        }
        else if (d.genre != genre) // If specific genre selected
        {
            return;
        }

        let pick = false; // Indicator for in range of startTime/endTime
        let currentMonth; // Current month on data traversing
        let findIdx; // Idx of existing month (for all genre)
        
        lineChartConfig.timeAttributes.forEach(timeAttribute => {

            currentMonth = monthToDate(timeAttribute);

            // Start of data
            if ((!pick) && +currentMonth == +startTimeAttribute)
            {
                pick = true;
            }

            if (pick) {

                 // If data for certain month already exists (for all genre)
                let found = false;
                displayedData.every(function (value, i) {
                
                    if (+value.date == +currentMonth) {
                        found = true;
                        findIdx = i;
                        return false;
                    }
                    return true;
                });

                if (found)  // Adds value to existing month data (for all genre)
                {
                    let val = displayedData[findIdx].value;
                    displayedData[findIdx] = { date: currentMonth, value: val + parseFloat(d[timeAttribute]) };
                } 
                else    // Adds new month data
                {
                    displayedData.push({ date: currentMonth, value: parseFloat(d[timeAttribute]) });
                }
            }
            
            // End of data
            if (pick && +currentMonth == +endTimeAttribute)
            {
                pick = false;
            }
        });
    })

    return displayedData;
}