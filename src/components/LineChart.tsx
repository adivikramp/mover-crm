import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const LineChart = () => {
    const labels = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug"];

    const datasets = [12, 45, 67, 43, 89, 34, 67, 43];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Revenue Dynamics (in thousand)",
                data: datasets,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={{ width: "100%", height: "100%", padding: "4px" }} className='flex items-center justify-center'>
            <Line data={data} />
        </div>
    );
};

export default LineChart;