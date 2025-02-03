// src/components/CourseCard.js
import React from 'react';

const CourseCard = ({ course }) => {
    return (
        <div className="col-lg-4">
            <div className="card overflow-hidden hover-img">
                <div className="position-relative">
                    <a href="javascript:void(0)">
                        <img src={course.image} className="card-img-top" alt="matdash-img" />
                    </a>
                    <span className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                        {course.duration}
                    </span>
                    <img src={course.userImage} alt="matdash-img" className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9" width="40" height="40" />
                </div>
                <div className="card-body p-4">
                    <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm mt-3">{course.title}</span>
                    <a className="d-block my-4 fs-5 text-dark fw-semibold link-primary" href="">
                        {course.description}
                    </a>
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center gap-2">
                            <i className="ti ti-eye text-dark fs-5"></i>{course.views}
                        </div>
                        <div className="d-flex align-items-center gap-2">${course.price}</div>
                        <div className="d-flex align-items-center fs-2 ms-auto">
                            <i className="ti ti-point text-dark"></i>{course.date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;