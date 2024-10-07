import { motion } from 'framer-motion';
import './Field2.css'; // Import the CSS file
import yourImage from '../../../images/res_logo_360.jpg'; // Adjust the path to your image

const Field2 = () => {
  return (
    <motion.div 
      id="field2-section"
      initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity
      animate={{ scale: 1, opacity: 1 }} // Animate to full size and opacity
      transition={{ duration: 0.7, ease: 'easeInOut' }} // Transition timing
      whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)' }} // Scale and shadow on hover
    >
      {/* Image Section */}
      <motion.img 
        src={yourImage} // Use your image source
        alt="Descriptive Alt Text" // Add a descriptive alt text for accessibility
        className="field2-image"
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
        transition={{ duration: 0.8, delay: 0.3 }} // Smooth transition for appearance
        whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for text
      >
        <motion.h2
          className="heading"
          initial={{ y: -20, opacity: 0 }} // Starts above and invisible
          animate={{ y: 0, opacity: 1 }} // Moves down and fades in
          transition={{ duration: 0.8, delay: 1 }} // Delay for heading
          whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for heading
        >
          What do we do
        </motion.h2>
        
        <motion.p
          className="paragraph"
          initial={{ y: 50, opacity: 0 }} // Starts from below
          animate={{ y: 0, opacity: 1 }} // Moves up and fades in
          transition={{ duration: 0.8, delay: 0.5 }} // Delay for paragraph
          whileHover={{ color: '#4F46E5', scale: 1.05 }} // Hover effect for paragraph
        >
          The AI-powered Resume Interview Toolkit offers an advanced solution with an AI-driven resume builder, 
          an AI cover letter generator, and an AI interview preparation tool to streamline your job application process. 
          It equips users with personalized and professional documents while enhancing interview readiness with intelligent insights.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Field2;
