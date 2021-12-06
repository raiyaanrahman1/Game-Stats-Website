import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

//top 10 rated games will be a bar chart with number of likes and dislikes
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

//compare ratings of two games in order to sort them (descending order)
function compare (a, b, getMetric) {
    const aVal = getMetric(a)
    const bVal = getMetric(b)
    if (aVal > bVal) {
        return -1;
    } else if (bVal > aVal) {
        return 1;
    }
    //otherwise values are equal
    return 0;
}

//get the top k games for a given metric
function getTopK (games, k, getMetric) {
    let topK = games.sort((a, b) => compare(a, b, getMetric)).slice(0,k);
    return topK
};

//get values for graph datapoints
function getData(games, getMetric) {
    const ratings = games.map(game => getMetric(game))
    return ratings
}

//get labels for graph (name of games)
function getLabels(games) {
    const labels = games.map(game => game.title)
    return labels
}

export function BarRankingChart(props) {
    const games = getTopK(props.games, props.amount, props.getMetric)
    const labels = getLabels(games)
    const values = getData(games, props.getMetric)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: props.title,
            },
        },
        maintainAspectRatio: false,
    };

    const data = {
        labels,
        datasets: [
            {
                label: props.metric,
                data: values,
                backgroundColor: props.color,
            },
        ],
    };

    return <div class="chart-container"> <Bar options={options} data={data}/> </div>;
}
