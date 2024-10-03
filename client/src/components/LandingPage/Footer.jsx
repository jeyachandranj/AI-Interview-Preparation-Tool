import { motion } from 'framer-motion'; // Import framer-motion for animation

const Footer = () => {
  return (
    <footer className="bg-purple-400 py-10">
      {/* Main Container with Flex for Layout */}
      <h2 className="text-2xl text-center text-orange-500 font-bold">CONNECT WITH US</h2>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      
        {/* Company Info Section */}
        <motion.div
          className="text-center md:text-left mb-8 md:mb-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 8.5 }} 
        >
          <div className="flex items-center space-x-4">
            <img src="./images/shine.png" alt="Logo" className="h-10 w-30 rounded-full" />
          </div>
          <p className="mt-2 text-black-200 p-4">
            3rd Floor, KJ Aditya Towers #L-14,<br />
            Vikram Sarabhai Instronic Estate Phase II,<br />
            Thiruvanmiyur, Chennai-600042
          </p>
          <p className="mt-2 text-black-200 p-4">+91-9500037221</p>
          <p className="mt-2 text-black-200 p-4">info@shinelogics.com</p>
        </motion.div>

        {/* Service Section */}
        <motion.div
          className="text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 8.5 }} 
        >
          <h2 className="text-2xl font-bold text-orange-500">SERVICE</h2>
          <ul className="text-black-200 mt-2">
            <li>Technology Consulting</li>
            <br></br>
            <li>Software Development</li>
            <br></br>
            <li>Product Development</li>
            <br></br>
            <li>Software QA and Testing</li>
            <br></br>
            <li>Customer Service</li>
          </ul>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 8.5 }} 
        >
          <h2 className="text-2xl font-bold text-orange-500">Technologies</h2>
          <ul className="text-black-200 mt-2">
            <li>Digital and IOT Innovation</li>
            <li>Data Engineering and Analytics</li>
            <li>Mobility</li>
          </ul>
        </motion.div>
      </div>

      {/* Connect with Us Section */}
      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, color: '#FFA500' }} // Initial color
        animate={{ opacity: 1, color: '#FF6600' }} // Transition to new color
        transition={{ duration: 3, delay: 8.5 }} 
      >
        {/* You can add more content here if needed */}
      </motion.div>
    </footer>
  );
};

export default Footer;
