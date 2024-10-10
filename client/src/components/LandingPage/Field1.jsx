import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; // Import framer-motion for animations
import { Link } from 'react-router-dom';
import './Field1.css'; // Import the CSS styles

const Field1 = () => {
  const [currentImage, setCurrentImage] = useState(0); // State to track the current image
  const images = ['./images/page11.png', './images/page12.png', './images/page13.png', './images/page14.png']; // Image sources

  // Change image every 4 seconds
  useEffect(() => {
    const imageToggle = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Change to the next image
    }, 4000); // Toggle interval

    return () => clearInterval(imageToggle); // Cleanup the interval on unmount
  }, []);

  // Use the scroll hook
  const { scrollY } = useScroll();
  
  // Use transform hook to rotate the image on scroll
  const rotateY = useTransform(scrollY, [0, 300], [0, -180]); // Rotate the image from 0 to -180 degrees on scroll
  
  // Zoom out effect for the text on scroll
  const scaleText = useTransform(scrollY, [0, 300], [1, 0.5]); // Scale text down from 1 to 0.5 based on scroll

  return (
    <motion.div
      id="field1-section"
      className="content-section"
      initial={{ opacity: 0 }} // Initial opacity only, no scaling
      animate={{ opacity: 1 }} // Animate to full opacity
      transition={{ duration: 0.7, ease: 'easeInOut' }} // Transition timing
    >
      <div className="text-container">
        {/* Animated Text Section */}
        <motion.div
          className="text-section"
          style={{ scale: scaleText }} // Apply scale effect based on scroll
          initial={{ y: 20, opacity: 0 }} // Start position
          animate={{ y: 0, opacity: 1 }} // Animate text into position
          exit={{ y: 20, opacity: 0 }} // Exit animation
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }} // Smooth transition
        >
          <h2 className="heading">
            AI Powered <span className="highlight">Resume Builder</span>
            <br />
            Helps with Interview Preparation
          </h2>
          <motion.p
            className="subheading"
          >
            Create your professional resume with ease!
          </motion.p>
          <motion.p
            className="additional-text"
            initial={{ opacity: 0 }} // Fade in effect
            animate={{ opacity: 1 }} // Final opacity
            transition={{ duration: 1, delay: 1 }} // Delay for fade-in
          >
            Our AI-driven tool simplifies the resume-building process, ensuring you stand out to employers.
          </motion.p>
          <div className="button-wrapper">
            <Link to='/resume'>
              <motion.button
                className="button"
                whileHover={{ scale: 1.05, backgroundColor: '#4F46E5', boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)' }} // Button hover effects
                whileTap={{ scale: 0.95 }} // Slight scale down on tap
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Dynamic Image Component */}
      <motion.img
        src={images[currentImage]} // Current image
        alt="Illustration"
        className="image"
        key={currentImage}
        style={{ rotateY }} // Apply rotateY based on scroll position
        initial={{ rotateY: 0 }} // Initial properties for image (no scaling)
        transition={{ duration: 1.2, ease: "easeInOut" }} // Smooth transition duration
        whileHover={{ 
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Add shadow on hover
          rotate: 5, // Slight rotation for effect
          transition: { duration: 0.3, ease: "easeInOut" } // Transition effect
        }}
      />
    </motion.div>
  );
};

export default Field1;
