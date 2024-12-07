import React from 'react';
import { Line } from 'react-chartjs-2';

export const LineChart = ({YearlyData}) => {
    // Sample data for the line chart
    const data = {
        labels: YearlyData ? YearlyData?.labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: YearlyData ? YearlyData?.data : [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    // Options for the line chart
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false, // This property controls whether to maintain the aspect ratio when resizing the chart.
        responsive: true, // This property enables responsiveness of the chart.
    };

    return (
        <div style={{ height: '75%', width: '80%' }}> {/* Set the desired height and width */}
            <Line data={data} options={options} />
        </div>
    );
};
