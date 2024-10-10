import { motion, useAnimation } from 'framer-motion'; // Import framer-motion for animation
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer'; // For scroll detection
import './Field7.css'; // Import the CSS file

const Field7 = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.3, // Trigger animation when 30% of the section is visible
    triggerOnce: false, // Allow it to animate both ways
  });

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1, opacity: 1 });
    } else {
      controls.start({ scale: 0.9, opacity: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div 
      ref={ref}
      id="field7-section" 
      initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity
      animate={controls} // Animate when in view
      transition={{ duration: 0.8 }} // Smooth transition
    >
      {/* Text Section with Animation */}
      <motion.div
        className="text-section" 
        initial={{ x: -100, opacity: 0 }} // Text comes from the left
        animate={{ x: inView ? 0 : -100, opacity: inView ? 1 : 0 }} // Animate when in view
        transition={{ 
          duration: 0.8, 
          delay: 0.3 // Smooth transition for appearance
        }}
      >
        <motion.h2
          className="heading"
          initial={{ y: -20, opacity: 0 }} // Starts above and invisible
          animate={{ y: inView ? 0 : -20, opacity: inView ? 1 : 0 }} // Animate when in view
          transition={{ duration: 0.8, delay: 1 }} // Delay for heading
        >
          Job Applying
        </motion.h2>
        
        <motion.p
          className="paragraph"
          initial={{ y: 50, opacity: 0 }} // Starts from below
          animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }} // Animate when in view
          transition={{ duration: 0.8, delay: 0.5 }} // Delay for paragraph
        >
          The job search component analyzes the data from your resume and generates personalized job recommendations based on your skills, experience, and career goals. 
          It streamlines the job search process by matching you with top opportunities that align with your profile.
        </motion.p>
      </motion.div>

      {/* Image Section */}
      <motion.img 
        src="./images/image6.jpeg" // Single image
        alt="Job Application Illustration" 
        className="image" 
        initial={{ scale: 0.9, opacity: 0 }} // Start smaller and invisible
        animate={controls} // Animate when in view
        transition={{ duration: 0.8, delay: 0.5 }} // Smooth transition with delay
      />
    </motion.div>
  );
};

export default Field7;
