
import { motion } from 'framer-motion'; // Import framer-motion for animation

const Field7 = () => {
  return (
    <motion.div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-gray-100 p-10 md:p-20 rounded-lg shadow-lg"
    initial={{ scale: 0.8, opacity: 0 }}  // Initial scale for pop-up effect
      animate={{ scale: 1, opacity: 1 }}    // Animate to full size and opacity
      transition={{ duration: 0.5 }}         // Control transition speed for pop-up
      whileHover={{ backgroundColor: '#FFD150' }} // Animate background color to orange on hover
      whileFocus={{ backgroundColor: '#FFD150' }}>
      {/* Text Section with Animation */}
      <motion.div
        className="flex flex-col w-full md:w-1/2 items-center md:items-start text-center md:text-left" // Text on the left for larger screens, centered for smaller screens
        initial={{ x: -100, opacity: 0, color: '#8A8A8A' }} // Text comes from left
        animate={{ x: 0, opacity: 1, color: '#1F2937' }} // Moves to original position and darkens
        transition={{ 
          duration:3,  // Faster transition for position and opacity
          color: { duration: 1.5 },
          delay:7.5// Smooth transition for color
        }}
      >
        <h2 className="text-3xl font-bold text-left text-blue-500">
        Job Applying
        </h2>
        <p className="mt-2 text-gray-700 text-left">
        The job search component analyzes the data from your resume and generates personalized job recommendations based on your skills, experience, and career goals. It streamlines the job search process by matching you with top opportunities that align with your profile.
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0" // Image goes below text in mobile view
        initial={{ x: 100, opacity: 0 }} // Image comes from the right
        animate={{ x: 0, opacity: 1 }} // Moves to its original position
        transition={{ duration: 3,delay:7.5}} // Faster animation for image
      > 
        <img 
          src="./images/image3.jpg" // Single image
          alt="Illustration" 
          className="h-[400px] w-[400px] object-contain" // Adjusted size to fit better
        />
      </motion.div>
    </motion.div>
  );
};

export default Field7;
