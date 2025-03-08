import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { IoImagesOutline, IoClose, IoExpand, IoArrowBack, IoArrowForward, IoInformationCircle, IoGrid, IoMenu } from 'react-icons/io5';
import '../assets/css/main.css';
import Footer from '../components/footer'; 

const api = axios.create({
  baseURL: 'https://logicleap-769836b54d38.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: false
});

const GalleryPage = () => {
  const [galleries, setGalleries] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchGalleries();
  }, []);

  // Combine all images from different galleries into a single array
  useEffect(() => {
    const combinedImages = [];
    galleries.forEach(gallery => {
      if (gallery.images && gallery.images.length > 0) {
        gallery.images.forEach(image => {
          combinedImages.push({
            ...image,
            galleryTitle: gallery.title || `Gallery ${gallery.id}`
          });
        });
      }
    });
    setAllImages(combinedImages);
  }, [galleries]);

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const response = await api.get('/galleries');
      if (response.status === 200) {
        setGalleries(response.data);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      setError('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const formatImageUrl = (path) => {
    if (!path) return '/placeholder-image.jpg';
    return `https://logicleap-769836b54d38.herokuapp.com/storage/${path.replace(/^\/+/, '')}`;
  };

  const openImageModal = (imagePath, imageIndex) => {
    setSelectedImage(imagePath);
    setCurrentImageIndex(imageIndex);
  };

  const closeImageModal = (e) => {
    if (e.target.classList.contains('image-modal-backdrop')) {
      setSelectedImage(null);
    }
  };

  const navigateImage = (direction) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < allImages.length) {
      setCurrentImageIndex(newIndex);
      setSelectedImage(allImages[newIndex].image_path);
    }
  };

  // Prevent event propagation for the modal content
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="gallery-page " style={{ 
      backgroundColor: '#f9f9f9', 
      minHeight: '100vh',
      direction: 'ltr'
    }}>
      {/* Spacing for pushing header down */}
      <div style={{height: '40px'}}></div>
      
      {/* Header Section - moved down a bit */}
      <div className="gallery-header" style={{
        background: 'linear-gradient(135deg, #A7D477 0%, #EB4747 100%)',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'white',
        borderRadius: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        margin: '60px 20px 30px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>Gallery</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
          </p>
        </motion.div>
        
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          right: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 1
        }}></div>
      </div>

      {/* Main content area */}
      <div className="gallery-content" style={{ 
        padding: '0 20px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Loading indicator */}
        {loading && (
          <div className="loading-container" style={{ 
            textAlign: 'center', 
            padding: '80px 0',
            margin: '40px auto' 
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                border: '6px solid #A7D477',
                borderTop: '6px solid #EB4747',
                margin: '0 auto'
              }}
            />
            <p style={{ marginTop: '20px', color: '#666', fontSize: '1.1rem' }}>Loading gallery...</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-alert"
            style={{
              padding: '20px',
              backgroundColor: '#ffecec',
              color: '#EB4747',
              borderRadius: '8px',
              margin: '20px auto',
              textAlign: 'center',
              border: '1px solid #EB4747',
              maxWidth: '600px',
              boxShadow: '0 4px 12px rgba(235, 71, 71, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <IoInformationCircle size={24} />
              <p style={{ margin: 0, fontWeight: 'bold' }}>{error}</p>
            </div>
          </motion.div>
        )}

        {!loading && !error && allImages.length > 0 && (
          <>
            {/* View mode toggles */}
            <div className="view-controls" style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '20px',
              padding: '15px 20px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div className="view-toggles" style={{ display: 'flex', gap: '10px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px',
                    background: viewMode === 'grid' ? '#EB4747' : '#f2f2f2',
                    color: viewMode === 'grid' ? 'white' : '#666',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IoGrid size={20} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px',
                    background: viewMode === 'list' ? '#EB4747' : '#f2f2f2',
                    color: viewMode === 'list' ? 'white' : '#666',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IoMenu size={20} />
                </motion.button>
              </div>
            </div>
            
            {/* All images display in one place */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' 
                  ? 'repeat(auto-fill, minmax(300px, 1fr))' 
                  : '1fr',
                gap: viewMode === 'grid' ? '20px' : '15px',
              }}
            >
              {allImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  className="gallery-image-container"
                  style={{
                    overflow: 'hidden',
                    borderRadius: '12px',
                    background: 'white',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    height: viewMode === 'grid' ? '300px' : '500px',
                    position: 'relative'
                  }}
                  onClick={() => openImageModal(image.image_path, index)}
                >
                  <img
                    src={formatImageUrl(image.image_path)}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  
                  {/* Gallery name badge */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'rgba(167, 212, 119, 0.8)',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    backdropFilter: 'blur(5px)'
                  }}>
                    {image.galleryTitle}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="image-overlay"
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                      padding: '20px 15px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#A7D477',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                      }}
                    >
                      <IoExpand style={{ color: 'white', fontSize: '24px' }} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* No images message */}
        {!loading && !error && allImages.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#666'
          }}>
            <IoImagesOutline size={60} style={{ color: '#ccc', margin: '0 auto 20px' }} />
            <h3>No images available</h3>
            <p>New images will be added soon</p>
          </div>
        )}
      </div>

      {/* Image Modal - with fixed close button */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="image-modal-backdrop"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="modal-content"
              style={{
                position: 'relative',
                width: '90%',
                height: '85vh',
                borderRadius: '15px',
                overflow: 'hidden',
                backgroundColor: 'transparent',
                marginTop: '60px'
              }}
              onClick={handleModalContentClick}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <img
                  src={formatImageUrl(selectedImage)}
                  alt="Enlarged image"
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '85vh',
                    margin: '0 auto',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                />
                
                {/* Image counter */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  backdropFilter: 'blur(5px)'
                }}>
                  {currentImageIndex + 1} / {allImages.length}
                </div>
                
                {/* Fixed Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#EB4747',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    zIndex: 10
                  }}
                >
                  <IoClose size={24} />
                </motion.button>
                
                {/* Navigation buttons */}
                {allImages.length > 1 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={currentImageIndex === 0}
                      onClick={() => navigateImage(-1)}
                      style={{
                        position: 'absolute',
                        left: '20px',
                        top: '50%',
                        backgroundColor: currentImageIndex === 0 ? 'rgba(100,100,100,0.5)' : 'rgba(167, 212, 119, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '55px',
                        height: '55px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: currentImageIndex === 0 ? 'default' : 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(5px)'
                      }}
                    >
                      <IoArrowBack size={28} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={currentImageIndex === allImages.length - 1}
                      onClick={() => navigateImage(1)}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        backgroundColor: currentImageIndex === allImages.length - 1 ? 'rgba(100,100,100,0.5)' : 'rgba(167, 212, 119, 0.8)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '55px',
                        height: '55px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: currentImageIndex === allImages.length - 1 ? 'default' : 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(5px)'
                      }}
                    >
                      <IoArrowForward size={28} />
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default GalleryPage;