import React, { useMemo, useEffect, useRef, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Charts = ({ data }) => {
    const [barGradient, setBarGradient] = useState(null);
    const [lineGradient, setLineGradient] = useState(null);
    const chartRef = useRef(null);

   
    useEffect(() => {
        const chartInstance = chartRef.current?.chartInstance;

        if (chartInstance) {
            const barCanvas = chartInstance.canvas;
            const lineCanvas = chartInstance.canvas;

           
            if (barCanvas) {
                const barCtx = barCanvas.getContext('2d');
                const gradient = barCtx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(75, 192, 192, 1)');
                gradient.addColorStop(1, 'rgba(153, 102, 255, 1)');
                setBarGradient(gradient);
            }

           
            if (lineCanvas) {
                const lineCtx = lineCanvas.getContext('2d');
                const gradient = lineCtx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, 'rgba(153, 102, 255, 1)');
                gradient.addColorStop(1, 'rgba(75, 192, 192, 1)');
                setLineGradient(gradient);
            }
        }
    }, [data]);

    const barChartData = useMemo(() => {
        const modelCounts = data.reduce((acc, vehicle) => {
            acc[vehicle.Model] = (acc[vehicle.Model] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(modelCounts),
            datasets: [
                {
                    label: 'Number of Vehicles by Model',
                    data: Object.values(modelCounts),
                    backgroundColor: barGradient || 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [data, barGradient]);

    const lineChartData = useMemo(() => {
        const yearCounts = data.reduce((acc, vehicle) => {
            acc[vehicle["Model Year"]] = (acc[vehicle["Model Year"]] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(yearCounts),
            datasets: [
                {
                    label: 'Number of Vehicles by Model Year',
                    data: Object.values(yearCounts),
                    fill: false,
                    borderColor: lineGradient || 'rgba(153, 102, 255, 1)', // Fallback if gradient is not ready
                    tension: 0.1,
                },
            ],
        };
    }, [data, lineGradient]);

    const pieChartData = useMemo(() => {
        const countyCounts = data.reduce((acc, vehicle) => {
            acc[vehicle.County] = (acc[vehicle.County] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(countyCounts),
            datasets: [
                {
                    data: Object.values(countyCounts),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF9F40',
                        '#4BC0C0',
                        '#9966FF',
                    ],
                },
            ],
        };
    }, [data]);

    const chartOptions = {
        maintainAspectRatio: false,
        animation: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        events: ['mousemove'],
    };

    return (
        <div className="charts">
            <h3>Electric Vehicles Insights</h3>

            <div className="chart-container" style={{ height: '400px' }}>
                <h4>Number of Vehicles by Model</h4>
                <Bar ref={chartRef} data={barChartData} options={chartOptions} />
            </div>

            <div className="chart-container" style={{ height: '400px' }}>
                <h4>Vehicle Count by Model Year</h4>
                <Line ref={chartRef} data={lineChartData} options={chartOptions} />
            </div>

            <div className="chart-container" style={{ height: '400px', width: '400px' }}>
                <h4>Distribution of Vehicles by County</h4>
                <Pie ref={chartRef} data={pieChartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Charts;
