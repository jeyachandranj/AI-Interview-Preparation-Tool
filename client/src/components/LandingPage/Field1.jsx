import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import { Link } from 'react-router-dom';
import './Field1.css'; // Import the CSS styles

const Field1 = () => {
  const [currentImage, setCurrentImage] = useState(0); // State to track the current image
  const [isFlipping, setIsFlipping] = useState(false); // State to track flipping effect
  const images = ['./images/page11.png', './images/page12.png', './images/page13.png', './images/page14.png']; // Image sources

  // Change image every 4 seconds
  useEffect(() => {
    const imageToggle = setInterval(() => {
      setIsFlipping(true); // Start the flipping animation
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Change to the next image
        setIsFlipping(false); // Reset flipping state
      }, 1000); // Delay to allow the flip animation to complete
    }, 4000); // Toggle interval

    return () => clearInterval(imageToggle); // Cleanup the interval on unmount
  }, []);

  return (
    <motion.div
      id="field1-section"
      className="content-section"
      initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity
      animate={{ scale: 1, opacity: 1 }} // Animate to full size and opacity
      transition={{ duration: 0.7, ease: 'easeInOut' }} // Transition timing
      whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)' }} // Hover effect
    >
      <div className="text-container">
        {/* Animated Text Section */}
        <motion.div
          className="text-section"
          initial={{ x: -100, opacity: 0 }} // Start position for text
          animate={{ x: 0, opacity: 1 }} // Animate text into position
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }} // Smooth transition
        >
          <h2 className="heading" whileHover={{ scale: 1.05, color: '#4F46E5' }}>
            AI Powered <span className="highlight">Resume Builder</span>
            <br />
            Helps with Interview Preparation
          </h2>
          <motion.p
            className="subheading"
            whileHover={{ scale: 1.05, color: '#4F46E5' }} // Scale and color change on hover
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
        initial={{ scale: 1, rotateY: 0 }} // Initial properties for image
        animate={{
          scale: isFlipping ? 1.05 : 1, // Scale for flip effect
          rotateY: isFlipping ? 180 : 0, // Rotation for flip effect
          transition: {
            duration: 1.2, // Transition duration
            ease: "easeInOut",
          },
        }}
        exit={{ scale: 0, rotateY: 180 }} // Exit transition
        whileHover={{ 
          scale: 1.1, // Enlarge on hover
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Add shadow on hover
          rotate: 5, // Slight rotation for effect
          transition: { duration: 0.3, ease: "easeInOut" } // Transition effect
        }}
      />
    </motion.div>
  );
};

export default Field1;
