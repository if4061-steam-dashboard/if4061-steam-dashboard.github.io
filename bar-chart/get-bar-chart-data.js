async function getBarChartData (context) {
    let path;
    let nameAttribute
    if (context.genre != "") {
        path = getBarChartDatasetPathByGenre(context.genre);
        nameAttribute = "Name";
    } else {
        path = aggregated_dataset_path;
        nameAttribute = "genre";
    }
    const data = await getBarChartDataByContextAndNameAttribute(context, path, nameAttribute);
    return { context, data };
}

function getBarChartDatasetPathByGenre(genre) {
    let path = "";
    switch (genre) {
        case "Action":
            path = actionDatasetPath;
            break;
        case "Adventure":
            path = adventureDatasetPath;
            break;
        case "Casual":
            path = casualDatasetPath;
            break;
        case "Education":
            path = educationDatasetPath;
            break;
        case "Racing":
            path = racingDatasetPath;
            break;
        case "RPG":
            path = rpgDatasetPath;
            break;
        case "Simulation":
            path = simulationDatasetPath;
            break;
        case "Sports":
            path = sportsDatasetPath;
            break;
        case "Strategy":
            path = strategyDatasetPath;
            break;
    }

    if (path == "") {
        throw ("Error. No genre inputted.");
    }
    return path;
}

async function getBarChartDataByContextAndNameAttribute(context, path, nameAttribute) {
    const { year, month } = context;
    //year input assumed to be be "2021", "2022" etc
    //month input assumed to be JAN, FEB, MAR that can be mapped to attribute name in the csv
    let data = [];
    const monthAttributeMap = {
        JAN: "January",
        FEB: "February",
        MAR: "March",
        APR: "April",
        MEI: "May",
        JUN: "June",
        JUL: "July",
        AGU: "August",
        SEP: "September",
        OKT: "October",
        NOV: "November",
        DES: "December",
    };
    const monthAttribute = monthAttributeMap[month];

    await d3.csv(path, function (d) {
        let data0 = {
            "name": d[nameAttribute],
            "playerBaseMonthAverage": d[monthAttribute.concat(" ", year)],
            "iconUrl": d["Icon URL"] != "" ? d["Icon URL"] : barChartConfig.defaultIconUrl
        };
        data.push(data0);
    });
    data.sort((a, b) => b.playerBaseMonthAverage - a.playerBaseMonthAverage);
    data = data.slice(0, 5);
    return data;
}
