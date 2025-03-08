<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>LogicLeap - Software Development & Programming Courses</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=poppins:300,400,500,600,700&display=swap" rel="stylesheet" />

        <!-- Styles -->
        <style>
            /* Base styles */
            *, ::after, ::before {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            :root {
                --primary: #3490dc;
                --primary-dark: #2779bd;
                --secondary: #6c63ff;
                --dark: #2d3748;
                --light: #f8fafc;
                --gray: #a0aec0;
                --success: #38c172;
            }
            html {
                scroll-behavior: smooth;
            }
            body {
                font-family: 'Poppins', sans-serif;
                line-height: 1.6;
                color: var(--dark);
                background-color: var(--light);
            }
            a {
                color: inherit;
                text-decoration: none;
                transition: all 0.3s ease;
            }
            img {
                max-width: 100%;
            }
            .container {
                width: 100%;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }
            .btn {
                display: inline-block;
                padding: 12px 30px;
                background: var(--primary);
                color: white;
                border-radius: 30px;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            .btn:hover {
                background: var(--primary-dark);
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            }
            .btn-secondary {
                background: var(--secondary);
            }
            .btn-secondary:hover {
                background: #5a52e0;
            }
            .btn-outline {
                background: transparent;
                border: 2px solid var(--primary);
                color: var(--primary);
            }
            .btn-outline:hover {
                background: var(--primary);
                color: white;
            }
            .section {
                padding: 100px 0;
            }
            .section-title {
                font-size: 36px;
                font-weight: 700;
                margin-bottom: 20px;
                position: relative;
                display: inline-block;
            }
            .section-title::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 70px;
                height: 4px;
                background: var(--primary);
                border-radius: 2px;
            }
            .text-center {
                text-align: center;
            }
            .text-center .section-title::after {
                left: 50%;
                transform: translateX(-50%);
            }

            /* Header */
            header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.95);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            .header-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 0;
            }
            .logo {
                font-size: 24px;
                font-weight: 700;
                color: var(--primary);
                display: flex;
                align-items: center;
            }
            .logo span {
                color: var(--secondary);
            }
            .logo-icon {
                width: 40px;
                margin-right: 10px;
            }
            nav ul {
                display: flex;
                list-style: none;
            }
            nav ul li {
                margin-left: 30px;
            }
            nav ul li a {
                font-weight: 500;
                position: relative;
            }
            nav ul li a::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--primary);
                transition: all 0.3s ease;
            }
            nav ul li a:hover {
                color: var(--primary);
            }
            nav ul li a:hover::after {
                width: 100%;
            }
            .mobile-toggle {
                display: none;
                cursor: pointer;
            }
            .mobile-toggle span {
                display: block;
                width: 25px;
                height: 3px;
                background: var(--dark);
                margin: 5px 0;
                transition: all 0.3s ease;
            }

            /* Hero Section */
            .hero {
                padding: 180px 0 100px;
                position: relative;
                overflow: hidden;
                background: linear-gradient(135deg, #f8fafc 0%, #e6f7ff 100%);
            }
            .hero-content {
                display: flex;
                align-items: center;
            }
            .hero-text {
                flex: 1;
                padding-right: 30px;
            }
            .hero-title {
                font-size: 48px;
                font-weight: 700;
                line-height: 1.2;
                margin-bottom: 20px;
                color: var(--dark);
            }
            .hero-title span {
                color: var(--primary);
            }
            .hero-description {
                font-size: 18px;
                margin-bottom: 30px;
                color: #64748b;
            }
            .hero-buttons {
                display: flex;
                gap: 15px;
            }
            .hero-image {
                flex: 1;
                text-align: center;
            }
            .hero-image img {
                max-width: 100%;
                animation: float 3s ease-in-out infinite;
            }
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0px); }
            }

            /* Services Section */
            .services {
                background-color: white;
            }
            .services-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            .service-card {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
                border-bottom: 4px solid transparent;
            }
            .service-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                border-bottom: 4px solid var(--primary);
            }
            .service-icon {
                width: 60px;
                height: 60px;
                background: rgba(52, 144, 220, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
            }
            .service-icon svg {
                width: 30px;
                height: 30px;
                fill: var(--primary);
            }
            .service-title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 15px;
            }
            .service-description {
                color: #64748b;
                margin-bottom: 20px;
            }
            .service-link {
                color: var(--primary);
                font-weight: 500;
                display: inline-flex;
                align-items: center;
            }
            .service-link svg {
                width: 16px;
                height: 16px;
                margin-left: 5px;
                transition: all 0.3s ease;
            }
            .service-link:hover svg {
                transform: translateX(5px);
            }

            /* About Section */
            .about {
                background-color: #f8fafc;
            }
            .about-content {
                display: flex;
                align-items: center;
                gap: 50px;
                margin-top: 50px;
            }
            .about-image {
                flex: 1;
            }
            .about-image img {
                width: 100%;
                border-radius: 10px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            .about-text {
                flex: 1;
            }
            .about-description {
                margin-bottom: 20px;
                color: #64748b;
            }
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-top: 30px;
            }
            .stat-item {
                text-align: center;
                padding: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            }
            .stat-number {
                font-size: 36px;
                font-weight: 700;
                color: var(--primary);
                margin-bottom: 5px;
            }
            .stat-title {
                font-size: 16px;
                color: #64748b;
            }

            /* Courses Section */
            .courses {
                background-color: white;
            }
            .courses-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            .course-card {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
            }
            .course-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            }
            .course-image {
                height: 200px;
                background-size: cover;
                background-position: center;
            }
            .course-content {
                padding: 20px;
            }
            .course-tag {
                display: inline-block;
                padding: 5px 10px;
                background: rgba(52, 144, 220, 0.1);
                color: var(--primary);
                border-radius: 20px;
                font-size: 12px;
                margin-bottom: 10px;
            }
            .course-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
            }
            .course-description {
                color: #64748b;
                margin-bottom: 15px;
                font-size: 14px;
            }
            .course-details {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                color: #64748b;
                padding-top: 15px;
                border-top: 1px solid #e2e8f0;
            }
            .course-price {
                font-weight: 600;
                color: var(--primary);
            }

            /* Testimonials Section */
            .testimonials {
                background-color: #f8fafc;
            }
            .testimonials-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            .testimonial-card {
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                position: relative;
            }
            .testimonial-card::before {
                content: '"';
                position: absolute;
                top: 10px;
                left: 20px;
                font-size: 60px;
                color: rgba(52, 144, 220, 0.1);
                font-family: serif;
            }
            .testimonial-text {
                margin-bottom: 20px;
                color: #64748b;
                font-style: italic;
            }
            .testimonial-author {
                display: flex;
                align-items: center;
            }
            .testimonial-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 15px;
                background-color: #e2e8f0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                color: var(--primary);
            }
            .testimonial-name {
                font-weight: 600;
            }
            .testimonial-position {
                font-size: 14px;
                color: #64748b;
            }

            /* Contact Section */
            .contact {
                background-color: white;
            }
            .contact-content {
                display: flex;
                gap: 50px;
                margin-top: 50px;
            }
            .contact-info {
                flex: 1;
            }
            .contact-item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 20px;
            }
            .contact-icon {
                width: 40px;
                height: 40px;
                background: rgba(52, 144, 220, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                flex-shrink: 0;
            }
            .contact-icon svg {
                width: 20px;
                height: 20px;
                fill: var(--primary);
            }
            .contact-text h4 {
                font-weight: 600;
                margin-bottom: 5px;
            }
            .contact-text p {
                color: #64748b;
            }
            .contact-form {
                flex: 1;
                background: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            .form-control {
                width: 100%;
                padding: 12px 15px;
                border: 1px solid #e2e8f0;
                border-radius: 5px;
                font-family: 'Poppins', sans-serif;
                transition: all 0.3s ease;
            }
            .form-control:focus {
                outline: none;
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.2);
            }
            textarea.form-control {
                resize: vertical;
                min-height: 120px;
            }

            /* Footer */
            footer {
                background-color: var(--dark);
                color: white;
                padding: 70px 0 20px;
            }
            .footer-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 30px;
                margin-bottom: 50px;
            }
            .footer-logo {
                font-size: 24px;
                font-weight: 700;
                color: white;
                margin-bottom: 15px;
                display: inline-block;
            }
            .footer-logo span {
                color: var(--primary);
            }
            .footer-description {
                color: #a0aec0;
                margin-bottom: 20px;
            }
            .footer-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 20px;
                position: relative;
                padding-bottom: 10px;
            }
            .footer-title::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 40px;
                height: 3px;
                background: var(--primary);
            }
            .footer-links {
                list-style: none;
            }
            .footer-links li {
                margin-bottom: 10px;
            }
            .footer-links li a {
                color: #a0aec0;
                transition: all 0.3s ease;
            }
            .footer-links li a:hover {
                color: white;
                padding-left: 5px;
            }
            .social-links {
                display: flex;
                gap: 15px;
            }
            .social-link {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            .social-link:hover {
                background: var(--primary);
                transform: translateY(-5px);
            }
            .social-link svg {
                width: 20px;
                height: 20px;
                fill: white;
            }
            .footer-bottom {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                color: #a0aec0;
                font-size: 14px;
            }

            /* Responsive Styles */
            @media (max-width: 992px) {
                .hero-content {
                    flex-direction: column;
                    text-align: center;
                }
                .hero-text {
                    padding-right: 0;
                    margin-bottom: 50px;
                }
                .hero-buttons {
                    justify-content: center;
                }
                .section-title {
                    font-size: 30px;
                }
                .about-content {
                    flex-direction: column;
                }
                .contact-content {
                    flex-direction: column;
                }
            }
            @media (max-width: 768px) {
                .header-container {
                    position: relative;
                }
                nav {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                nav.active {
                    max-height: 300px;
                }
                nav ul {
                    flex-direction: column;
                    padding: 20px 0;
                }
                nav ul li {
                    margin: 0;
                    text-align: center;
                    padding: 10px 0;
                }
                .mobile-toggle {
                    display: block;
                }
                .mobile-toggle.active span:nth-child(1) {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }
                .mobile-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                .mobile-toggle.active span:nth-child(3) {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
                .services-grid,
                .courses-grid,
                .testimonials-grid {
                    grid-template-columns: 1fr;
                }
                .hero-title {
                    font-size: 36px;
                }
            }
        </style>
    </head>
    <body>
        <!-- Header -->
        <header>
            <div class="container header-container">
                <a href="#" class="logo">
                    <svg class="logo-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#3490dc" d="M12,22C6.5,22 2,17.5 2,12S6.5,2 12,2s10,4.5 10,10-4.5,10-10,10zm0-18c-4.4,0-8,3.6-8,8s3.6,8 8,8 8-3.6 8-8-3.6-8-8-8zm3.5,10.5l-5-5 1.4-1.4 3.6,3.6 1.4,1.4-1.4,1.4z"/>
                    </svg>
                    Logic<span>Leap</span>
                </a>
                <div class="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#courses">Courses</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>

        <!-- Hero Section -->
        <section id="home" class="hero">
            <div class="container hero-content">
                <div class="hero-text">
                    <h1 class="hero-title">Unleash Your <span>Coding Potential</span> With LogicLeap</h1>
                    <p class="hero-description">We provide cutting-edge software development services and comprehensive programming courses designed to transform beginners into experts.</p>
                    <div class="hero-buttons">
                        <a href="#services" class="btn">Our Services</a>
                        <a href="#courses" class="btn btn-outline">Explore Courses</a>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="/api/placeholder/600/400" alt="Software Development Illustration">
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="section services">
            <div class="container">
                <h2 class="section-title text-center">Our Services</h2>
                <p class="text-center">We offer comprehensive software development solutions for businesses of all sizes.</p>
                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12.89 3l1.96.4L11.11 21l-1.96-.4L12.89 3zm6.7 4L23 12l-3.42 5H15.5L19 12l-3.5-5h4.1zM8.59 8l3.5 5-3.5 5H4.5L1 12l3.5-5h4.09z"/>
                            </svg>
                        </div>
                        <h3 class="service-title">Custom Software Development</h3>
                        <p class="service-description">We build tailored software solutions that align perfectly with your business objectives and user needs.</p>
                        <a href="#" class="service-link">
                            Learn More
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M17 16.99c-1.35 0-2.2.42-2.95.8-.65.33-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.95c1.35 0 2.2-.42 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.42 2.95-.8c.65-.33 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm0-4.45c-1.35 0-2.2.43-2.95.8-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.32-1.17.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm2.95-8.08c-.75-.38-1.58-.8-2.95-.8s-2.2.42-2.95.8c-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.37-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.93c1.35 0 2.2-.43 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8V5.04c-.9 0-1.4-.25-2.05-.58zM17 8.09c-1.35 0-2.2.43-2.95.8-.65.35-1.15.6-2.05.6s-1.4-.25-2.05-.6c-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.35-1.15.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.32 1.18-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8V9.49c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8z"/>
                            </svg>
                        </div>
                        <h3 class="service-title">Web Application Development</h3>
                        <p class="service-description">Create powerful, scalable web applications with modern technologies and responsive designs.</p>
                        <a href="#" class="service-link">
                            Learn More
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                            </svg>
                        </a>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-4.2-5.78v1.75l3.2-2.99L12.8 9v1.7c-3.11.43-4.35 2.56-4.8 4.7 1.11-1.5 2.58-2.18 4.8-2.18z"/>