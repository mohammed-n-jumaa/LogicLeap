import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoExpand } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/css/main.css";

function Footer() {
  const [allGalleryImages, setAllGalleryImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Number of images to display at once
  const displayCount = 8;

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Effect to rotate images every 5 seconds
  useEffect(() => {
    if (allGalleryImages.length > 0) {
      // Initial random selection
      selectRandomImages();
      
      // Set up the interval for changing images
      const interval = setInterval(() => {
        selectRandomImages();
      }, 5000);
      
      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [allGalleryImages]);

  const api = axios.create({
    baseURL: 'https://logicleap-769836b54d38.herokuapp.com/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: false
  });

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/galleries');
      if (response.status === 200) {
        // Combine all images from different galleries into one array
        const allImages = [];
        response.data.forEach(gallery => {
          if (gallery.images && gallery.images.length > 0) {
            gallery.images.forEach(image => {
              allImages.push({
                ...image,
                galleryTitle: gallery.title || `معرض ${gallery.id}`
              });
            });
          }
        });
        setAllGalleryImages(allImages);
      }
    } catch (error) {
      console.error('Error fetching gallery images for footer:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to select random images from the full collection
  const selectRandomImages = () => {
    const images = [...allGalleryImages];
    
    // If we don't have enough images, just use what we have
    if (images.length <= displayCount) {
      setDisplayedImages(images);
      return;
    }
    
    // Shuffle the array (Fisher-Yates algorithm)
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
    
    // Take the first displayCount images
    setDisplayedImages(images.slice(0, displayCount));
  };

  const formatImageUrl = (path) => {
    if (!path) return '/placeholder-image.jpg';
    return `https://logicleap-769836b54d38.herokuapp.com/storage/${path.replace(/^\/+/, '')}`;
  };

  return (
    <footer id="footer" className="footer">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* معلومات footer الأخرى */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="index.html" className="logo d-flex align-items-center">
              <span className="sitename">LogicLeap</span>
            </a>
            <div className="footer-contact pt-3">
              <p>A108 Mecca Street</p>
              <p>Amman, Jordan</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>++962 75636826</span>
              </p>
              <p>
                <strong>Email:</strong> <span>info@LogicLeap.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="">
                <i className="bi bi-facebook" />
              </a>
              <a href="">
                <i className="bi bi-instagram" />
              </a>
              <a href="">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>

          {/* روابط أخرى */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/about">About us</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="#">Terms of service</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <a href="/services">Web Design</a>
              </li>
              <li>
                <a href="/services">Web Development</a>
              </li>
              <li>
                <a href="/services">Product Management</a>
              </li>
              <li>
                <a href="/services">Marketing</a>
              </li>
              <li>
                <a href="/services">Graphic Design</a>
              </li>
            </ul>
          </div>

          {/* إضافة قسم Gallery */}
          <div className="col-lg-4 col-md-3 footer-gallery">
            <h4>Gallery</h4>
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="gallery-images" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
                marginTop: '15px',
                minHeight: '170px' // Set a minimum height to prevent layout shifts
              }}>
                <AnimatePresence mode="wait">
                  {displayedImages.map((image, index) => (
                    <motion.div
                      key={`${image.id || index}-${Date.now()}`} // Ensure unique keys when images change
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: 'relative' }}
                    >
                      <Link to="/gallerypage">
                        <motion.div 
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }}
                          style={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            height: '80px',
                            position: 'relative'
                          }}
                        >
                          <img 
                            src={formatImageUrl(image.image_path)} 
                            alt={`Gallery ${index + 1}`} 
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'rgba(0,0,0,0.5)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <IoExpand style={{ color: 'white', fontSize: '16px' }} />
                          </motion.div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <div className="credits">
          <p>© 2025 LogicLeap. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;