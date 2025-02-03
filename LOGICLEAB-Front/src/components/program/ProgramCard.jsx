import React from 'react';
import '../../assets/css/styles.css';

const ProgramCard = ({ program, onShow, onEdit, onDelete }) => {
  return (
    <div className="col-md-4 d-flex">
      <div className="card course-card w-100">
        <img src={program.image} className="card-img-top" alt={program.title} />
        <div className="card-body">
          <h5 className="card-title">{program.title}</h5>
          <p className="card-text">{program.description}</p>
        </div>
        <div className="course-actions">
          <button className="btn show" onClick={() => onShow(program)}>Show</button>
          <button className="btn edit" onClick={() => onEdit(program)}>Edit</button>
          <button className="btn delete" onClick={() => onDelete(program.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
