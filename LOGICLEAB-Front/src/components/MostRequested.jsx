// src/components/MostRequested.js
import React from 'react';

const MostRequested = () => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title d-flex align-items-center gap-2 mb-5 pb-3">Most requested
                    <span><iconify-icon icon="solar:question-circle-bold" className="fs-7 d-flex text-muted" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-success" data-bs-title="Locations"></iconify-icon></span>
                </h5>
                <div className="row">
                    <div className="col-4">
                        <iconify-icon icon="solar:laptop-minimalistic-line-duotone" className="fs-7 d-flex text-primary"></iconify-icon>
                        <span className="fs-11 mt-2 d-block text-nowrap">HTML</span>
                        <h4 className="mb-0 mt-1">87%</h4>
                    </div>
                    <div className="col-4">
                        <iconify-icon icon="solar:smartphone-line-duotone" className="fs-7 d-flex text-secondary"></iconify-icon>
                        <span className="fs-11 mt-2 d-block text-nowrap">CSS</span>
                        <h4 className="mb-0 mt-1">9.2%</h4>
                    </div>
                    <div className="col-4">
                        <iconify-icon icon="solar:tablet-line-duotone" className="fs-7 d-flex text-success"></iconify-icon>
                        <span className="fs-11 mt-2 d-block text-nowrap">Oracle</span>
                        <h4 className="mb-0 mt-1">3.1%</h4>
                    </div>
                </div>

                <div className="vstack gap-4 mt-7 pt-2">
                    <div>
                        <div className="hstack justify-content-between">
                            <span className="fs-3 fw-medium">HTML</span>
                            <h6 className="fs-3 fw-medium text-dark lh-base mb-0">87%</h6>
                        </div>
                        <div className="progress mt-6" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-primary" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="hstack justify-content-between">
                            <span className="fs-3 fw-medium">CSS</span>
                            <h6 className="fs-3 fw-medium text-dark lh-base mb-0">9.2%</h6>
                        </div>
                        <div className="progress mt-6" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-secondary" style={{ width: '50%' }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="hstack justify-content-between">
                            <span className="fs-3 fw-medium">Oracle</span>
                            <h6 className="fs-3 fw-medium text-dark lh-base mb-0">3.1%</h6>
                        </div>
                        <div className="progress mt-6" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar bg-success" style={{ width: '35%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostRequested;