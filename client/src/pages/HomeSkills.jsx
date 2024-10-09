import React, { useState } from 'react';
import Card from '../components/Skill/card.jsx';
import i1 from '../assets/read.png';
import i2 from '../assets/write.png';
import i3 from '../assets/listen.png';
import i4 from '../assets/speak.png';
import { motion } from 'framer-motion'; // Framer Motion for animations
import TestCoordinator from '../components/TextCoordinator.jsx'; 

function HomeSkills() {
  const [isStarted, setIsStarted] = useState(false);

  // Skill descriptions for display
  const skillDescriptions = {
    listen: { description: 'Enhance your listening skills...', details: 'Listening exercises will include...' },
    speak: { description: 'Build confidence in speaking...', details: 'Speaking tasks will involve...' },
    read: { description: 'Boost your reading comprehension...', details: 'Reading exercises will consist of...' },
    write: { description: 'Enhance your writing skills...', details: 'Writing tasks will focus on...' },
  };

  // Handle start test
  const handleStartTest = () => {
    setIsStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen  p-6">
      {isStarted ? (
        <TestCoordinator selectedSkills={{
          listen: true, // Automatically selected for the test
          speak: true,  // Automatically selected for the test
          read: true,   // Automatically selected for the test
          write: true,  // Automatically selected for the test
        }} /> // Pass default selectedSkills to TestCoordinator
      ) : (
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">Skills Assessment</h1>

          {/* Display the skill cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {Object.keys(skillDescriptions).map((skill, index) => (
              <motion.div
                key={skill}
                className=" text-white rounded-lg shadow-lg p-4 transition-shadow cursor-pointer hover:shadow-xl"
                initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }} // Left or right entrance
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }} // Fade out
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Card
                  img={{ listen: i3, speak: i4, read: i1, write: i2 }[skill]}
                  name={skill.charAt(0).toUpperCase() + skill.slice(1)}
                  description={skillDescriptions[skill].description}
                />
                <p className="text-white mt-2">{skillDescriptions[skill].details}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Rules and Regulations */}
          <div className="mb-6 w-full">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">Rules and Regulations</h2>
            <p className="text-white mb-2">
              Please read and adhere to the following rules:
            </p>
            <ul className="list-disc pl-5 mb-4 text-white">
              <li>Each test lasts for 5 minutes.</li>
              <li>Ensure a quiet environment while taking the tests.</li>
              <li>Do not use external resources during the tests.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Start Test Button */}
      {!isStarted && (
        <button
        onClick={handleStartTest}
        className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 mb-6 shadow-purple-custom hover:shadow-xl transition-shadow w-[200px] h-[50px]"
      >
        Start Test
      </button>
      
      
      )}
    </div>
  );
}

export default HomeSkills;