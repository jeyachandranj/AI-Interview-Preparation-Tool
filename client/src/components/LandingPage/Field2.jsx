import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer'; // For scroll detection
import './Field2.css'; // Import the CSS file
import yourImage from '../../../images/res_logo_360.jpg'; // Adjust the path to your image

const Field2 = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger animation when 20% of the section is visible
    triggerOnce: false, // Allow it to animate both ways (scrolling down and up)
  });

  useEffect(() => {
    if (inView) {
      // Start animations when in view
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 1.2, ease: 'easeInOut' }
      });
    } else {
      // Reset animations when out of view
      controls.start({
        opacity: 0,
        x: (custom) => (custom === 'image' ? '-100vw' : '100vw'), // Image to the left, text to the right
        transition: { duration: 1.2, ease: 'easeInOut' }
      });
    }
  }, [controls, inView]);

  return (
    <motion.div 
      id="field2-section"
      ref={ref}
      initial={{ opacity: 0 }} // Initial opacity for the entire section
      animate={controls} // Animate based on scroll in and out of view
    >
      {/* Image Section */}
      <motion.img 
        src={yourImage} // Use your image source
        alt="Descriptive Alt Text" // Add a descriptive alt text for accessibility
        className="field2-image"
        custom="image" // Custom identifier for image animation
        initial={{ x: '-100vw', opacity: 0 }} // Start off-screen to the left
        animate={controls} // Animate based on view (enter and exit from view)
      />

      {/* Text Section with Animation */}
      <motion.div
        className="text-section"
        custom="text" // Custom identifier for text animation
        initial={{ x: '100vw', opacity: 0 }} // Start off-screen to the right
        animate={controls} // Animate based on scroll state
      >
        <motion.h2
          className="heading"
          initial={{ y: -20, opacity: 0 }} // Start above and invisible
          animate={controls} // Animate heading when in view
          transition={{ duration: 1.2, delay: 0.2 }} // Slow entrance for the heading
        >
          What do we do
        </motion.h2>
        
        <motion.p
          className="paragraph"
          initial={{ y: 20, opacity: 0 }} // Start below
          animate={controls} // Animate paragraph when in view
          transition={{ duration: 0.3, delay: 0.4 }} // Delay for paragraph
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
