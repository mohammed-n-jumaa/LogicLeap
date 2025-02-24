import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';  // استيراد axios
import "../assets/css/main.css";


function Courses() {
  const [programs, setPrograms] = useState([]);
  const [categories, setCategories] = useState([]); // إضافة حالة لتخزين الفئات
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // تحميل البرامج والفئات 
  useEffect(() => {
    const fetchProgramsAndCategories = async () => {
      setLoading(true);
      try {
        const [programsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/programs'),
          axios.get('http://localhost:8000/api/categories'), // افترض أن هناك API لجلب الفئات
        ]);

        // تعديل البرامج لإضافة رابط الصورة بشكل صحيح
        const programsWithImagePath = programsResponse.data.map((program) => ({
          ...program,
          image: program.image ? `http://localhost:8000/storage/${program.image}` : null,
        }));

        // تعيين البرامج والفئات
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

  // دالة للحصول على اسم الفئة بناءً على category_id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <>
    <Header/>
    
    <main className="main mt-5">
      <section id="Courses" className="pricing section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Courses</h2>
          <p>Explore Our Comprehensive Courses in Information Technology</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row g-4 justify-content-center">
            {loading && <div>Loading...</div>}  
            {error && <div>{error}</div>}     
            {!loading && !error && programs.map((program) => (
              <div className="col-md-3 mb-4" key={program.id}>
                <div className="card course-card">
                  <img src={program.image} className="card-img-top" alt="Course Image" />
                  <div className="card-body">
                    <span className="badge badge-category mb-2">
                      {getCategoryName(program.category_id)} {/* عرض اسم الفئة */}
                    </span>
                    <h5 className="card-title">{program.title}</h5>
                    <ul className="list-unstyled">
                      <li><strong>Mode:</strong> {program.mode}</li>
                      <li><strong>Price:</strong> {program.price}</li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">{program.duration}</span>
                      <Link to={`/courseDetails2/${program.id}`} className="btn btn-primary me-0 me-sm-2 mx-1 mt-1">Enroll</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}


export default Courses;
