import { motion } from 'framer-motion';
import './Field4.css'; // Import the CSS file

const Field4 = () => {
  return (
    <motion.div 
      id="field4-section" 
      initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity
      animate={{ scale: 1, opacity: 1 }} // Animate to full size and opacity
      transition={{ duration: 0.7, ease: 'easeInOut' }} // Transition timing
      whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' }} // Scale and shadow on hover
    >
      {/* Image Section */}
      <motion.img 
        src="./images/image5.jpg" // Single image
        alt="Illustration" 
        className="image" 
        initial={{ scale: 1, opacity: 0 }} // Start at normal size and invisible
        animate={{ scale: 1, opacity: 1, rotate: [0, 2, -2, 0] }} // Slight rotation animation
        transition={{ duration: 0.8, delay: 0.5 }} // Smooth transition with delay
        whileHover={{ scale: 1.1 }} // Scale image up on hover
      />

      {/* Text Section with Animation */}
      <motion.div
        className="text-section" 
        initial={{ x: 100, opacity: 0 }} // Text comes from the right
        animate={{ x: 0, opacity: 1 }} // Moves to original position
        transition={{ 
          duration: 0.8, 
          delay: 0.3 // Smooth transition for appearance
        }}
        whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for text
      >
        <motion.h2
          className="heading"
          initial={{ y: -20, opacity: 0 }} // Starts above and invisible
          animate={{ y: 0, opacity: 1 }} // Moves down and fades in
          transition={{ duration: 0.8, delay: 1 }} // Delay for heading
          whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for heading
        >
          Virtual Interview Preparation
        </motion.h2>
        
        <motion.p
          className="paragraph"
          initial={{ y: 50, opacity: 0 }} // Starts from below
          animate={{ y: 0, opacity: 1 }} // Moves up and fades in
          transition={{ duration: 0.8, delay: 0.5 }} // Delay for paragraph
          whileHover={{ color: '#4F46E5', scale: 1.05 }} // Hover effect for paragraph
        >
          The interview preparation tool simulates a virtual AI interview by analyzing your resume and generating personalized questions based on your experience and skills. 
          It helps you practice answering relevant questions, boosting your confidence and readiness for real-life interviews.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Field4;
