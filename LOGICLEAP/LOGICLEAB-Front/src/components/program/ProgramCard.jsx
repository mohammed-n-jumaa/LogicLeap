import React from 'react';
import '../../assets/css/styles.css';

const ProgramCard = ({ program, onShow, onEdit, onDelete }) => {
  return (
    <div className="col-md-4 d-flex">
      <div className="card course-card w-100 shadow-sm">
        <img src={program.image} className="card-img-top" alt={program.title} />
        <div className="card-body">
          <h5 className="card-title fw-bold">{program.title}</h5>
          <p className="card-text">{program.description}</p>
        </div>
        <div className="course-actions d-flex justify-content-between p-3">
          <button className="btn btn-primary" onClick={() => onShow(program)}>Show</button>
          <button className="btn btn-warning" onClick={() => onEdit(program)}>Edit</button>
          <button className="btn btn-danger" onClick={() => onDelete(program.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
export default ProgramCard;