import { motion } from 'framer-motion'; // Import framer-motion for animation

const Field3 = () => {
  return (
    <motion.div 
      className="mt-8 flex flex-col md:flex-row items-center justify-between bg-gray-100 p-10 md:p-20 rounded-lg shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }}  // Initial scale for pop-up effect
      animate={{ scale: 1, opacity: 1 }}    // Animate to full size and opacity
      transition={{ duration: 0.5 }}         // Control transition speed for pop-up
      whileHover={{ backgroundColor: '#FFD150' }} // Animate background color to orange on hover
      whileFocus={{ backgroundColor: '#FFD150' }}
    >
      {/* Text Section with Animation */}
      <motion.div
        className="flex flex-col w-full md:w-1/2 items-center md:items-start text-center md:text-left" // Text on the left for larger screens, centered for smaller screens
        initial={{ x: -100, opacity: 0, color: '#8A8A8A' }} // Text comes from left
        animate={{ x: 0, opacity: 1, color: '#1F2937' }} // Moves to original position and darkens
        transition={{ 
          duration: 3,  // Faster transition for position and opacity
          color: { duration: 1.5 },
          delay: 4 // Smooth transition for color
        }}
      >
        <h2 className="text-3xl font-bold text-left text-blue-500">
          AI-Powered Resume Builder
        </h2>
        <p className="mt-2 text-gray-700 text-left">
          The AI-powered resume builder helps create tailored, professional resumes by automatically formatting and optimizing content based on job roles. 
          It analyzes key skills and experience to highlight strengths, ensuring your resume stands out to recruiters and applicant tracking systems (ATS).
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0" // Image goes below text in mobile view
        initial={{ x: 100, opacity: 0 }} // Image comes from the right
        animate={{ x: 0, opacity: 1 }} // Moves to its original position
        transition={{ duration: 3, delay: 4 }} // Faster animation for image
      > 
        <motion.img 
          src="./images/image1.jpg" // Single image
          alt="Illustration" 
          className="h-80 w-80 object-contain" // Increase size to h-80 and w-80 for larger image
          initial={{ scale: 1 }} // Start at normal size
          animate={{ scale: 1.2 }} // Scale up to 1.2x the original size
          transition={{ duration: 0.5, delay: 4 }} // Smooth scale transition with a delay
        />
      </motion.div>
    </motion.div>
  );
};

export default Field3;
