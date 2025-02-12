import React from 'react';

const CourseCard = ({ course }) => {
    // Handle image path construction
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;

        // Remove any leading slashes and construct the full URL
        const cleanPath = imagePath.replace(/^\/\+/, '');
        return `http://localhost:8000/storage/${cleanPath}`;
    };

    // Image error handling
    const handleImageError = (e) => {
        e.target.src = '/api/placeholder/400/250'; // Fallback to placeholder
        e.target.alt = 'Course placeholder image';
    };

    if (!course) {
        return (
            <div className="col-lg-4">
                <div className="alert alert-danger" role="alert">
                    Course data is missing or invalid
                </div>
            </div>
        );
    }

    return (
        <div className="col-lg-4">
            <div className="card overflow-hidden hover-img" style={styles.card}>
                <div className="position-relative" style={styles.positionRelative}>
                    <img 
                        src={getImageUrl(course.image)}
                        onError={handleImageError}
                        className="card-img-top"
                        alt={`${course.title} course image`}
                        style={styles.image}
                    />
                    <span 
                        className="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0"
                        style={styles.badge}
                    >
                        {course.duration} hours
                    </span>
                </div>
                <div className="card-body p-4" style={styles.cardBody}>
                    <span className="badge text-bg-light fs-2 py-1 px-2 lh-sm mt-3" style={styles.titleBadge}>
                        {course.title}
                    </span>
                    <a 
                        href={`/courses/${course.id}`}
                        className="d-block my-4 fs-5 text-dark fw-semibold link-primary"
                        style={styles.link}
                    >
                        {course.description}
                    </a>
                    <div className="d-flex align-items-center gap-4" style={styles.infoContainer}>
                        <div className="d-flex align-items-center gap-2" style={styles.infoItem}>
                            <i className="ti ti-eye text-dark fs-5"></i>
                            {course.views}
                        </div>
                        <div className="d-flex align-items-center gap-2" style={styles.infoItem}>
                            ${course.price}
                        </div>
                        <div className="d-flex align-items-center fs-2 ms-auto" style={styles.date}>
                            <i className="ti ti-point text-dark"></i>
                            {course.date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        width: '100%',
        maxWidth: '350px',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 'auto',
    },
    positionRelative: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'contain',
        objectPosition: 'center',
    },
    badge: {
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    cardBody: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    titleBadge: {
        display: 'block',
        textAlign: 'center',
        marginBottom: '8px',
    },
    link: {
        marginTop: 'auto',
        color: 'inherit',
        textDecoration: 'none',
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    date: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
};

export default CourseCard;