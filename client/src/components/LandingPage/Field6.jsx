import { motion } from 'framer-motion'; // Import framer-motion for animation

const Field6 = () => {
  return (
    <motion.div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-gray-100 p-10 md:p-20 rounded-lg shadow-lg"
    initial={{ scale: 0.8, opacity: 0 }}  // Initial scale for pop-up effect
      animate={{ scale: 1, opacity: 1 }}    // Animate to full size and opacity
      transition={{ duration: 0.5 }}         // Control transition speed for pop-up
      whileHover={{ backgroundColor: '#FFD150' }} // Animate background color to orange on hover
      whileFocus={{ backgroundColor: '#FFD150' }}>
      {/* Image Section */}
      <motion.div 
        className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0" // Image goes above text in mobile view
        initial={{ x: -100, opacity: 0 }} // Image comes from the left
        animate={{ x: 0, opacity: 1 }} // Moves to its original position
        transition={{ 
          duration: 3,  // Smooth transition for position and opacity
          delay: 6.5 // Slight delay for better animation sequence
        }}
      > 
        <img 
          src="./images/image4.png" // Replace with your image path
          alt="Skill Analyzer Illustration" 
          className="h-[400px] w-[400px] object-contain" // Adjusted size to fit better
        />
      </motion.div>

      {/* Text Section with Animation */}
      <motion.div
        className="flex flex-col w-full md:w-1/2 items-center md:items-start text-center md:text-left mt-8 md:mt-0" // Text on the right for larger screens, centered for smaller screens
        initial={{ x: 100, opacity: 0 }} // Text comes from the right
        animate={{ x: 0, opacity: 1 }} // Moves to its original position
        transition={{ 
          duration: 3,  // Smooth transition for position and opacity
          delay: 6.5 // Delay to match the image entry animation
        }}
      >
        <h2 className="text-3xl font-bold text-blue-500">
          Skill Analyzer
        </h2>
        <p className="mt-2 text-gray-700">
          The skill analyzer evaluates a candidate's resume and assesses their proficiency in relevant job skills. 
          By analyzing the applicant's experience and qualifications, it provides a detailed skill report, identifying strengths 
          and areas for improvement, ensuring alignment with job requirements.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Field6;
