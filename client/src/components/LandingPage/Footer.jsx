import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="footer-title">CONNECT WITH US</h2>
      <div className="footer-container">
      
        {/* Company Info Section */}
        <motion.div
          className="company-info"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, delay: 8.5 }} 
        >
          <div className="company-logo">
            <img src="./images/shine.png" alt="Logo" className="logo-img" />
          </div>
          <p className="company-address">
            3rd Floor, KJ Aditya Towers #L-14,<br />
            Vikram Sarabhai Instronic Estate Phase II,<br />
            Thiruvanmiyur, Chennai-600042
          </p>
          <p className="company-contact">+91-9500037221</p>
          <p className="company-email">info@shinelogics.com</p>
        </motion.div>

        {/* Service Section */}
        <motion.div
          className="services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 8.5 }} 
        >
          <h2 className="section-title">SERVICES</h2>
          <ul className="service-list">
            <li>Technology Consulting</li>
            <li>Software Development</li>
            <li>Product Development</li>
            <li>Software QA and Testing</li>
            <li>Customer Service</li>
          </ul>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          className="technologies"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 8.5 }} 
        >
          <h2 className="section-title">TECHNOLOGIES</h2>
          <ul className="tech-list">
            <li>Digital and IOT Innovation</li>
            <li>Data Engineering and Analytics</li>
            <li>Mobility</li>
          </ul>
        </motion.div>
      </div>

      {/* Connect with Us Section */}
      <motion.div
        className="connect-us"
        initial={{ opacity: 0, color: '#B08D57' }} // Initial color (gold)
        animate={{ opacity: 1, color: '#8A6E45' }} // Transition to a darker gold tone
        transition={{ duration: 3, delay: 8.5 }} 
      >
        {/* You can add more content here if needed */}
      </motion.div>
    </footer>
  );
};

export default Footer;
