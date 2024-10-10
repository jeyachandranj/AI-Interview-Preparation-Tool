import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import './Field4.css'; // Import the CSS file

const Field4 = () => {
  // Control animations
  const imageControls = useAnimation();
  const textControls = useAnimation();

  // Trigger animations when in view
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger multiple times for both scroll down and up
    threshold: 0.2, // 20% of the element is visible before triggering
  });

  useEffect(() => {
    if (inView) {
      // Animate image and text when in view
      imageControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8 },
      });

      textControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, delay: 0.3 },
      });
    } else {
      // Reset to initial state when not in view (scroll up)
      imageControls.start({
        x: -100,
        opacity: 0,
        transition: { duration: 0.8 },
      });

      textControls.start({
        x: 100,
        opacity: 0,
        transition: { duration: 0.8 },
      });
    }
  }, [inView, imageControls, textControls]);

  return (
    <motion.div 
      id="field4-section"
      ref={ref} // Connects the scroll detection
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      {/* Image Section */}
      <motion.img 
        src="./images/image5.jpg" // Single image
        alt="Illustration"
        className="image"
        initial={{ x: -100, opacity: 0 }} // Start from the left
        animate={imageControls} // Animate on scroll down and up
        whileHover={{ scale: 1.1 }} // Scale image up on hover
      />

      {/* Text Section with Scroll Animation */}
      <motion.div
        className="text-section"
        initial={{ x: 100, opacity: 0 }} // Start from the right
        animate={textControls} // Animate on scroll down and up
        whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for text
      >
        <motion.h2
          className="heading"
          whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for heading
        >
          Virtual Interview Preparation
        </motion.h2>
        
        <motion.p
          className="paragraph"
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
