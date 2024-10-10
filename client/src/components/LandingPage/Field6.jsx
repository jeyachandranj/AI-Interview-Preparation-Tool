import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import './Field6.css'; // Import the CSS file

const Field6 = () => {
  // Control animations
  const textControls = useAnimation();
  const imageControls = useAnimation();

  // Trigger animations when in view
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger multiple times (scroll down & up)
    threshold: 0.2, // 20% of the element is visible before triggering
  });

  useEffect(() => {
    if (inView) {
      // Animate the text and image when in view (coming from the top)
      textControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8 },
      });

      imageControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, delay: 0.3 },
      });
    } else {
      // Reset to initial state when out of view (scrolling up)
      textControls.start({
        y: -100, // Move the text upwards when out of view
        opacity: 0,
        transition: { duration: 0.8 },
      });

      imageControls.start({
        y: -100, // Move the image upwards when out of view
        opacity: 0,
        transition: { duration: 0.8, delay: 0.3 },
      });
    }
  }, [inView, textControls, imageControls]);

  return (
    <motion.div 
      id="field6-section"
      ref={ref} // Connects the scroll detection to the section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Image Section */}
      <motion.img 
        src="./images/image4.png" // Specific image for Field6
        alt="Skill Analyzer Illustration"
        className="image"
        initial={{ y: -100, opacity: 0 }} // Start off from above
        animate={imageControls} // Animate on scroll
        whileHover={{ scale: 1.1 }} // Scale image up on hover
      />

      {/* Text Section with Scroll Animation */}
      <motion.div
        className="text-section"
        initial={{ y: -100, opacity: 0 }} // Start off from above
        animate={textControls} // Animate on scroll
        whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for text
      >
        <motion.h2
          className="heading"
          whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for heading
        >
          Skill Analyzer
        </motion.h2>
        
        <motion.p
          className="paragraph"
          whileHover={{ color: '#4F46E5', scale: 1.05 }} // Hover effect for paragraph
        >
          The skill analyzer evaluates a candidate's resume and assesses their proficiency in relevant job skills. 
          By analyzing the applicant's experience and qualifications, it provides a detailed skill report, identifying strengths 
          and areas for improvement, ensuring alignment with job requirements.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Field6;
