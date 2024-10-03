import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animation
import { Link } from 'react-router-dom';
const Field1 = () => {
  const [currentImage, setCurrentImage] = useState(0); // State to track current image
  const [isFlipping, setIsFlipping] = useState(false); // State to track if the image is flipping
  const images = ['./images/page11.png', './images/page12.png', './images/page13.png', './images/page14.png']; // Array of images to toggle

  // Toggle image every 4 seconds
  useEffect(() => {
    const imageToggle = setInterval(() => {
      setIsFlipping(true); // Start flipping the image
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Switch to the next image after flipping
        setIsFlipping(false); // Reset flipping state
      }, 1000); // Wait for the flip animation duration before switching images
    }, 4000); // 4 seconds interval for the whole process

    return () => clearInterval(imageToggle); // Cleanup on component unmount
  }, []);

  return (
    <motion.div
      className="mt-8 flex flex-col md:flex-row items-center justify-between bg-gray-100 p-10 md:p-20 rounded-lg shadow-lg"
      initial={{ scale: 0.8, opacity: 0 }} // Initial scale for pop-up effect
      animate={{ scale: 1, opacity: 1 }}   // Animate to full size and opacity
      transition={{ duration: 0.5 }}        // Control transition speed for pop-up
      whileHover={{ backgroundColor: '#FFD150' }} // Animate background color to light orange on hover
      whileFocus={{ backgroundColor: '#FFD150' }} // Animate background color to light orange on focus
    >
      {/* Text Section with Animation */}
      <motion.div
        className="flex flex-col w-full md:w-1/2 items-start" // Stack on small screens, row on medium/large
        initial={{ x: -100, opacity: 0, color: '#8A8A8A' }} // Initial position, opacity, and color (dim gray)
        animate={{ x: 0, opacity: 1, color: '#1F2937' }} // Final position, opacity, and color (darker)
        transition={{
          duration: 3, // Faster transition for position and opacity
          color: { duration: 4 }, // Smooth transition for color
          delay: 0.8,
        }}
      >
        <h2 className="text-3xl font-bold text-left text-blue-500">
          AI Powered <span className="text-3xl font-bold text-orange-500">Resume Builder</span>
          <br />
          helps for Interview preparation
        </h2>

        <div className="mt-auto text-left w-full">
          <Link to='/resume'><button className="mt-4 bg-orange-400 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-500">
            Get Started
          </button>
          </Link>
        </div>
      </motion.div>

      {/* Image Section with Animation */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0"
        initial={{ x: 100, opacity: 0 }} // Initial position and opacity
        animate={{ x: 0, opacity: 1 }} // Final position and opacity
        transition={{
          duration: 3,
          delay: 0.8,
        }}
      >
        <motion.img
          src={images[currentImage]} // Dynamically switch image
          alt="Illustration"
          className="h-[400px] w-[400px] object-contain" // Adjusted size to fit better
          key={currentImage} // Use currentImage as a key for each image to trigger re-mount
          initial={{ scale: 1, rotateY: 0 }} // Initial scale and rotation for the image
          animate={{
            scale: isFlipping ? 1.2 : 1, // Scale up to 1.2 when flipping
            rotateY: isFlipping ? 60 : 0, // Flip effect (180 degrees)
            transition: {
              duration: isFlipping ? 1 : 0.5, // Duration for scaling up and flipping
              ease: "easeInOut", // Smooth easing
            },
          }}
          exit={{ scale: 0, rotateY: 180 }} // Zoom out while flipping
        />
      </motion.div>
    </motion.div>
  );
};

export default Field1;
