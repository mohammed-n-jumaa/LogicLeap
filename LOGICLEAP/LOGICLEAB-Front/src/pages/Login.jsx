import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../assets/css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Track loading state changes
    useEffect(() => {
        console.log('Loading state:', isLoading);
    }, [isLoading]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        console.log('Starting login process...');

        try {
            console.log('Sending login request...');
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });

            console.log('Login response received:', response.status);

            if (response.data.token) {
                console.log('Login successful, storing data...');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                login(response.data.user);
                navigate('/');
            }
        } catch (error) {
            console.log('Login error:', error);
            setError('Invalid credentials or unauthorized access');
        } finally {
            console.log('Login process completed');
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container">
            <ul className="circles">
                {[...Array(10)].map((_, i) => (
                    <li key={i}></li>
                ))}
            </ul>

            <div className="login-container">
                <div className="logo-container">
                    <div className="logo">
                        <span className="L1">L</span><span className="ogic">ogic</span>
                        <span className="L2">L</span><span className="eap">eap</span>
                    </div>
                    <div className="logo-text">Admin Portal</div>
                </div>

                <form id="loginForm" onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                        <label htmlFor="emailInput">Email Address</label>
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    </div>

                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                        <label htmlFor="passwordInput">Password</label>
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-login text-white" 
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;