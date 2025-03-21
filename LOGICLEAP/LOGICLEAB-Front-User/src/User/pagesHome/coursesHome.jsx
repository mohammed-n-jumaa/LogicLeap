import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
   
import "../assets/css/main.css";
  
function Courses() {
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]);
    
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
      
  useEffect(() => {
    const fetchProgramsAndCategories = async () => {
      setLoading(true);
      try {
        const [programsResponse, categoriesResponse] = await Promise.all([
          axios.get('https://logicleap-769836b54d38.herokuapp.com/api/programs'),
          axios.get('https://logicleap-769836b54d38.herokuapp.com/api/categories'),
        ]);
                
        // Filter to only include active programs
        const activePrograms = programsResponse.data.filter(program => 
          program.status === 'active'
        );
        
        const programsWithImagePath = activePrograms.map((program) => ({
          ...program,
          image: program.image ? `https://logicleap-769836b54d38.herokuapp.com/storage/${program.image}` : null,
        }));
                
        setPrograms(programsWithImagePath);
        setCategories(categoriesResponse.data);
        setError(null);
      } catch (err) {
        console.error(err.message);
        setError('Failed to fetch programs or categories.');
      } finally {
        setLoading(false);
      }
    };
        
    fetchProgramsAndCategories();
  }, []);
    
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };
    
  return (
    <main className="main">
      <section id="Courses" className="pricing section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Courses</h2>
          <p>Explore Our Comprehensive Courses in Information Technology</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row g-4 justify-content-center">
            {loading && <div>Loading...</div>}
                        
            {error && <div>{error}</div>}
                        
            {!loading && !error && programs.length > 0 ? (
              programs.map((program) => (
                <div className="col-md-3 mb-4" key={program.id}>
                  <div className="card course-card h-100">
                    <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                      <img
                        src={program.image}
                        className="card-img-top"
                        alt="Course Image"
                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <span className="badge badge-category mb-2">
                        {getCategoryName(program.category_id)}
                      </span>
                      <h5 className="card-title">{program.title}</h5>
                      <ul className="list-unstyled">
                        <li><strong>Mode:</strong> {program.mode}</li>
                        <li><strong>Price:</strong> {program.price}</li>
                      </ul>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="text-muted">{program.duration} hours</span>
                        <Link to={`/courseDetails2/${program.id}`} className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Enroll</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && !error && <div>No active courses available at the moment.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Courses;