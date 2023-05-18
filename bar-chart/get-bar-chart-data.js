async function getBarChartData (context) {
    const { genre, year, month } = context;
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
    if (path == ""){
        throw ("Error. No genre inputted.");
    }
    //year input assumed to be be "2021", "2022" etc
    //month input assumed to be "February, January, March" just like in the csv

    let data = []
    const monthAttributeMap = {
        JAN: "January",
        FEB: "February",
        MAR: "March",
        APR: "April",
        MEI: "May",
        JUN: "June",
        JUL: "July",
        AUG: "August",
        SEP: "September",
        OKT: "October",
        NOV: "November",
        DES: "December",
    };
    const monthAttribute = monthAttributeMap[month];

    // TODO: Please give just top 5. :)
    await d3.csv(path, function(d, index) {
        if (index >= 5) return; // This is just a hotfix.
        
        let data0 = {
            "name": d["Name"],
            "playerBaseMonthAverage": d[monthAttribute.concat(" ", year)],
            "iconUrl": ""//idk how to get one, sorry :(
        }
        data.push(data0);
    });

    return { context, data };
}