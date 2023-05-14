let previousState = null;
// Test
const state1 = {
    "context": {
        "genre": "Arcade",
        "year": "2023",
        "month": "JAN"
    },
    "data": [
        {
            "name": "Geometry Dash Meltdown",
            "playerBaseMonthAverage": 2500,
            "iconUrl": "https://play-lh.googleusercontent.com/o7hHBVIagQ_rylkmNuIx_sOEzaoAgRSHQhsfBM_C5MV3nJThWC_kkTYaBJJwTnfVc7I"
        },
        {
            "name": "Geometry Dash",
            "playerBaseMonthAverage": 1000,
            "iconUrl": "https://upload.wikimedia.org/wikipedia/id/3/35/Geometry_Dash_Logo.PNG"
        },
        {
            "name": "Jumping Cube",
            "playerBaseMonthAverage": 100,
            "iconUrl": "<URL-3>"
        }
    ]
};

const state2 = {
    "context": {
        "genre": "Arcade",
        "year": "2023",
        "month": "FEB"
    },
    "data": [
        {
            "name": "Geometry Dash",
            "playerBaseMonthAverage": 3000,
            "iconUrl": "https://upload.wikimedia.org/wikipedia/id/3/35/Geometry_Dash_Logo.PNG"
        },
        {
            "name": "Geometry Dash Subzero",
            "playerBaseMonthAverage": 1500,
            "iconUrl": "https://play-lh.googleusercontent.com/QtW5CVMDs9zzbRW5L2QNMqcapOXCMsUiRxPe-eKwiR04L-DQf3gcW21GOglufcRj8A"
        },
        {
            "name": "Geometry Dash Meltdown",
            "playerBaseMonthAverage": 200,
            "iconUrl": "https://play-lh.googleusercontent.com/o7hHBVIagQ_rylkmNuIx_sOEzaoAgRSHQhsfBM_C5MV3nJThWC_kkTYaBJJwTnfVc7I"
        }
    ]
};

function makeBarChartSectionTransition(genre, year, month) {
    if (genre == "Semua Genre") {
        barChartSection.select("#bar-chart-title").text(`Banyak Pemain per Genre • ${month} ${year}`);
    } else {
        barChartSection.select("#bar-chart-title").text(`Banyak Pemain per Game • ${genre} • ${month} ${year}`);
    }

    // Get the data from backend

    const currentState = state1; // dummy
    if (previousState !== null && previousState.context.genre === currentState.context.genre) return;

    makeBarChartTransition(previousState, currentState);
    makeScalerTransition(currentState.data[0].playerBaseMonthAverage);
}

makeBarChartSectionTransition("Action", "2022", "DES");
