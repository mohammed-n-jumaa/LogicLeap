import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const [service, setService] = useState({
        title: '',
        description: '',
        category_id: '',
        price: '',
        status: 'active',
    });

    const [categories, setCategories] = useState([]); // لحفظ الفئات
    const [alertMessage, setAlertMessage] = useState(''); // حالة تنبيه الرسالة
    const navigate = useNavigate();

    // تحميل الفئات من الـ API
    useEffect(() => {
        axios.get('http://localhost:8000/api/categories')
            .then((response) => {
                setCategories(response.data); // تعيين الفئات في الـ state
            })
            .catch((error) => {
                console.error('There was an error fetching categories:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setService({
            ...service,
            [id]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/site-services', service)
            .then((response) => {
                console.log('Service added successfully:', response.data);
                
                // عرض التنبيه عند إضافة الخدمة بنجاح
                setAlertMessage('Service added successfully!');
                
                // إعادة التوجيه إلى صفحة إدارة الخدمات بعد 2 ثانية
                setTimeout(() => {
                    navigate('/service-management');
                }, 2000);

                // إعادة تعيين البيانات
                setService({
                    title: '',
                    description: '',
                    category_id: '',
                    price: '',
                    status: 'active',
                });
            })
            .catch((error) => {
                console.error('There was an error adding the service:', error);
            });
    };

    return (
        <div className="page-wrapper bg-light" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <div className="body-wrapper">
                <div className="container-fluid py-4">
                    <div className="card shadow-sm border-0 rounded-lg overflow-hidden">
                        <div className="card-body p-5">
                            <h3 className="card-title fw-bold text-primary mb-4 text-center">Add New Service</h3>

                            {/* عرض التنبيه إذا كانت هناك رسالة */}
                            {alertMessage && (
                                <div className="alert alert-success text-center" role="alert">
                                    {alertMessage}
                                </div>
                            )}

                            <div className="card border-0 shadow-none">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="title"
                                                        value={service.title}
                                                        onChange={handleChange}
                                                        placeholder="Service Title"
                                                        required
                                                    />
                                                    <label htmlFor="title">Service Title</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select"
                                                        id="category_id"
                                                        value={service.category_id}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="" disabled>Select Category</option>
                                                        {categories.map((category) => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="category_id">Service Category</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <textarea
                                                        className="form-control"
                                                        id="description"
                                                        value={service.description}
                                                        onChange={handleChange}
                                                        placeholder="Service Description"
                                                        rows="3"
                                                        required
                                                    ></textarea>
                                                    <label htmlFor="description">Service Description</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="price"
                                                        value={service.price}
                                                        onChange={handleChange}
                                                        placeholder="Service Price"
                                                        required
                                                    />
                                                    <label htmlFor="price">Service Price</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className="form-select"
                                                        id="status"
                                                        value={service.status}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                    <label htmlFor="status">Service Status</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button type="submit" className="btn btn-primary btn-lg px-5 py-2 shadow-sm">Submit Service</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;
