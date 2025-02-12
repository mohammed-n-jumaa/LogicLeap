import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, CategoryScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const MostRequested = ({ mostRequested }) => {
    const labels = mostRequested.map(program => program.title);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Request Percentage (%)',
            data: mostRequested.map(program => Number(program.requestCount)),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.4,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Program Requests Chart',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Percentage (%)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Programs',
                },
            },
        },
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title d-flex align-items-center gap-2 mb-5 pb-3" data-testid="most-requested-title">
                    Most Requested
                    <span>
                        <iconify-icon 
                            icon="solar:question-circle-bold" 
                            className="fs-7 d-flex text-muted" 
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top" 
                            data-bs-custom-class="tooltip-success" 
                            data-bs-title="Locations">
                        </iconify-icon>
                    </span>
                </h5>

                <Line data={data} options={options} />

                <div className="vstack gap-4 mt-4 pt-2" data-testid="programs-list">
                    {mostRequested.map((program) => (
                        <div key={program.id} className="hstack justify-content-between">
                            <span className="fs-3 fw-medium" data-testid={`program-title-${program.id}`}>{program.title}</span>
                            <h6 className="fs-3 fw-medium text-dark lh-base mb-0" data-testid={`program-requestCount-${program.id}`}>{program.requestCount}%</h6>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MostRequested;