import { motion, useScroll, useTransform } from 'framer-motion';
import './Field3.css'; // Import the CSS file
import yourimg from "../../../images/image1.jpg";

const Field3 = () => {
  // Use scroll to track the scroll progress
  const { scrollYProgress } = useScroll();

  // Animate text and image positions and opacity based on scroll
  const textY = useTransform(scrollYProgress, [0, 1], [-100, 0]); // Move text from 100px above to its normal position
  const imageY = useTransform(scrollYProgress, [0, 1], [-150, 0]); // Move image from 150px above to its normal position
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [0, 1]); // Text opacity from 0 to 1
  const opacityImage = useTransform(scrollYProgress, [0, 0.5], [0, 1]); // Image opacity from 0 to 1

  return (
    <motion.div 
      id="field3-section" 
      initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity
      animate={{ scale: 1, opacity: 1 }} // Animate to full size and opacity
      transition={{ duration: 0.7, ease: 'easeInOut' }} // Transition timing
    >
      {/* Text Section with Scroll Animation */}
      <motion.div
        className="text-section" 
        style={{ y: textY, opacity: opacityText }} // Apply scroll-based Y translation and opacity
        transition={{ duration: 0.8 }} // Smooth transition for appearance
      >
        <motion.h2
          className="heading"
          initial={{ y: -100, opacity: 0 }} // Starts above and invisible
          animate={{ y: 0, opacity: 1 }} // Moves to its normal position and becomes visible
          transition={{ duration: 0.8, delay: 0.5 }} // Delay for heading
        >
          AI Resume Builder
        </motion.h2>
        
        <motion.p
          className="paragraph"
          initial={{ y: -50, opacity: 0 }} // Starts from above and invisible
          animate={{ y: 0, opacity: 1 }} // Moves to its normal position and becomes visible
          transition={{ duration: 1.8, delay: 0.7 }} // Delay for paragraph
        >
          The AI-powered resume builder helps create tailored, professional resumes by automatically formatting and optimizing content based on job roles. 
          It analyzes key skills and experience to highlight strengths, ensuring your resume stands out to recruiters and applicant tracking systems (ATS).
          With a user-friendly interface, you can easily customize your resume layout and content. 
          Get tips and suggestions to improve your chances of landing an interview, all powered by cutting-edge AI technology.
          Whether you're a seasoned professional or just starting your career, our tool adapts to your needs, providing relevant suggestions and templates.
        </motion.p>
      </motion.div>

      {/* Image Section with Scroll Animation */}
      <motion.img 
        src={yourimg} // Single image
        alt="Illustration" 
        className="image" 
        style={{ y: imageY, opacity: opacityImage }} // Apply scroll-based Y translation and opacity
        transition={{ duration: 0.8 }} // Smooth transition with delay
        whileHover={{ scale: 1.1 }} // Scale image up on hover
      />
    </motion.div>
  );
};

export default Field3;
