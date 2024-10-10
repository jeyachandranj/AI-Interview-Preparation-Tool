import { useState } from 'react'; // Import useState from React
import { RiAccountCircleFill } from "react-icons/ri";
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Field1 from '../components/LandingPage/Field1'; 
import Field2 from '../components/LandingPage/Field2'; 
import Field3 from '../components/LandingPage/Field3'; 
import Field4 from '../components/LandingPage/Field4'; 
import Field5 from '../components/LandingPage/Field5'; 
import Field6 from '../components/LandingPage/Field6'; 
import Field7 from '../components/LandingPage/Field7'; 
import Footer from '../components/LandingPage/Footer'; 
import './LandingPage.css';  // Import the normal CSS

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-container">
      {/* Animated Navbar */}
      <motion.nav
        className="navbar"
        initial={{ y: -100, opacity: 0 }} // Start above the viewport with no opacity
        animate={{ y: 0, opacity: 1 }} // Animate to original position and full opacity
        transition={{ duration: 0.5, ease: 'easeOut' }} // Smooth transition
      >
        <div className="flex items-center space-x-4">
          <img src="./images/shine.png" alt="Logo" className="logo"  style={{height:'50px',width:'150px'}}/>
        </div>

        {/* Hamburger Icon for Mobile View */}
        <div className="hamburger-button" onClick={toggleDropdown}>
          <svg className="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </div>

        {/* Regular Navigation Links */}
        <ul className="navbar-links">
          <li><a href="#home" className="nav-link">Resume</a></li>
          <li><a href="#about" className="nav-link">Cover Letter</a></li>
          <li><a href="#services" className="nav-link">Interview Preparation</a></li>
          <li><a href="#contact" className="nav-link">Sign Up</a></li>
          <li><a href="#contact" className="nav-link">Sign In</a></li>
          <div className="account-icon">
            <RiAccountCircleFill />
          </div>
        </ul>
      </motion.nav>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu open">
          <ul>
            <li><a href="#home" className="dropdown-link">Resume</a></li>
            <li><a href="#about" className="dropdown-link">Cover Letter</a></li>
            <li><a href="#services" className="dropdown-link">Interview Preparation</a></li>
            <li><a href="#contact" className="dropdown-link">Sign Up</a></li>
            <li><a href="#contact" className="dropdown-link">Sign In</a></li>
          </ul>
        </div>
      )}

      {/* Render Field Components */}
      <Field1 />
      <Field2 />
      <Field3 />
      <Field4 />
      <Field5 />
      <Field6 />
      <Field7 />
      <Footer />
    </div>
  );
}

export default App;
