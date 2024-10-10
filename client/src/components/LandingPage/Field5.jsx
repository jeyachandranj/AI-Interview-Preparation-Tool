import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import './Field5.css'; // Import the CSS file

const Field5 = () => {
  // Control animations
  const textControls = useAnimation();
  const imageControls = useAnimation();

  // Trigger animations when in view
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger animation multiple times (down & up)
    threshold: 0.2, // 20% of the element is visible before triggering
  });

  useEffect(() => {
    if (inView) {
      // Animate text and image when in view (appearing from the bottom)
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
        y: 100, // Move the text down initially
        opacity: 0,
        transition: { duration: 0.8 },
      });

      imageControls.start({
        y: 100, // Move the image down initially
        opacity: 0,
        transition: { duration: 0.8, delay: 0.3 },
      });
    }
  }, [inView, textControls, imageControls]);

  return (
    <motion.div 
      id="field5-section"
      ref={ref} // Connect the scroll detection to the section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Text Section with Scroll Animation */}
      <motion.div
        className="text-section"
        initial={{ y: 100, opacity: 0 }} // Start from below
        animate={textControls} // Animate on scroll down and up
        whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for text
      >
        <motion.h2
          className="heading"
          whileHover={{ scale: 1.05, color: '#4F46E5' }} // Hover effect for heading
        >
          AI Cover Letter Generator
        </motion.h2>
        
        <motion.p
          className="paragraph"
          whileHover={{ color: '#4F46E5', scale: 1.05 }} // Hover effect for paragraph
        >
          The AI-powered cover letter generator creates customized, professional cover letters by analyzing the job description and your resume. 
          It highlights your qualifications and aligns your skills with the job role, saving time while ensuring a compelling, tailored letter for each application.
        </motion.p>
      </motion.div>

      {/* Image Section */}
      <motion.img 
        src="./images/image3.jpg" // Single image
        alt="Illustration"
        className="image"
        initial={{ y: 100, opacity: 0 }} // Start from below
        animate={imageControls} // Animate on scroll down and up
        whileHover={{ scale: 1.1 }} // Scale image up on hover
      />
    </motion.div>
  );
};

export default Field5;
