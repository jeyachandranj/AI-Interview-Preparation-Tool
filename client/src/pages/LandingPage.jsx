import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import Field1 from '../components/LandingPage/Field1';
import Field2 from '../components/LandingPage/Field2';
import Field3 from '../components/LandingPage/Field3';
import Field4 from '../components/LandingPage/Field4';
import Field5 from '../components/LandingPage/Field5';
import Field6 from '../components/LandingPage/Field6';
import Field7 from '../components/LandingPage/Field7';
import Footer from '../components/LandingPage/Footer';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4">
      <nav className="bg-gray-300 p-4 rounded-lg shadow-lg flex items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <img src="./images/shine.png" alt="Logo" className="h-10 w-30 rounded-full" />
        </div>
        
        <div className="md:hidden flex items-center">
          <button onClick={toggleDropdown} className="text-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex space-x-8">
          <li><a href="#home" className="text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Resume</a></li>
          <li><a href="#about" className="text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Cover Letter</a></li>
          <li><a href="#services" className="text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Interview Preparation</a></li>
          <li><Link to="/signup" className="text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Sign Up</Link></li>
          <li><Link to="/signin" className="text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Sign In</Link></li>
          <div className="flex items-center text-2xl">
            <RiAccountCircleFill className="text-orange-500" />
          </div>
        </ul>
      </nav>

      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-11/12 bg-gray-300 rounded-lg shadow-lg md:hidden">
          <ul className="p-4">
            <li><a href="#home" className="block text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Resume</a></li>
            <li><a href="#about" className="block text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Cover Letter</a></li>
            <li><a href="#services" className="block text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Interview Preparation</a></li>
            <li><Link to="/signup" className="block text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Sign Up</Link></li>
            <li><Link to="/signin" className="block text-black font-bold px-4 py-2 rounded-md hover:bg-orange-600">Sign In</Link></li>
          </ul>
        </div>
      )}

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

export default LandingPage;