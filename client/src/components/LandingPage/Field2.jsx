import { motion } from 'framer-motion'; // Import framer-motion for animation

const Field2 = () => {
  return (
    <motion.div className="mt-8 flex flex-col items-center justify-between bg-gray-100 p-10 md:p-20 rounded-lg shadow-lg"
    initial={{ scale: 0.8, opacity: 0 }}  // Initial scale for pop-up effect
      animate={{ scale: 1, opacity: 1 }}    // Animate to full size and opacity
      transition={{ duration: 0.5 }}         // Control transition speed for pop-up
      whileHover={{ backgroundColor: '#FFD150' }} // Animate background color to orange on hover
      whileFocus={{ backgroundColor: '#FFD150' }}>
      {/* Text Section with Animation */}
      <motion.div
        className="flex flex-col w-full items-center text-center" // Center align text and make responsive
        initial={{ y: 100, opacity: 0, color: '#8A8A8A' }} // Text comes from down (y-axis 100px)
        animate={{ y: 0, opacity: 1, color: '#1F2937' }} // Text moves up to its original position and darkens
        transition={{ 
          duration: 2,  // Duration for position and opacity
          color: { duration: 2.5 }, // Smooth transition for color
          delay:2.5
        }} 
      >
        <h2 className="text-4xl font-bold text-blue-500 mb-4">
          What do we do
        </h2> {/* Header Animation */}

        <motion.p
          className="text-xl text-gray-700"
          initial={{ y: 100, opacity: 0 }} // Text comes from down
          animate={{ y: 0, opacity: 1 }} // Text moves up to its original position
          transition={{ 
            duration: 2, // Duration for position and opacity
            delay: 3 // Slightly longer delay for the paragraph to appear after the header
          }}
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
