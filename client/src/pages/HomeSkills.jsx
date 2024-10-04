import React, { useState } from 'react';
import Card from '../components/Skill/card.jsx';
import { useNavigate } from 'react-router-dom';
import i1 from '../assets/read.png';
import i2 from '../assets/write.png';
import i3 from '../assets/listen.png';
import i4 from '../assets/speak.png';
import Radio from '../components/Skill/Ratio.jsx';
import { motion } from 'framer-motion'; // Framer Motion for animations
function HomeSkills() {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state
  const navigate = useNavigate();
  // Handle when a skill card is clicked
  const handleCardClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);  // Open the modal when a skill is clicked
  };
  // Handle difficulty change and navigate to next page
  const handleDifficultyChange = (difficulty) => {
    setIsModalOpen(false);  // Close modal after selection
    navigate(`/${selectedSkill}`);
  };
  // Skill descriptions for display
  const skillDescriptions = {
    listen: 'Enhance your listening skills with exercises designed to improve comprehension of accents, tones, and contexts.',
    speak: 'Build confidence in speaking through guided tasks that help you articulate your thoughts clearly in both casual and formal settings.',
    read: 'Boost your reading comprehension and vocabulary with a diverse selection of texts that challenge your understanding and reveal complex ideas.',
    write: 'Enhance your writing skills with practical exercises that guide you through brainstorming, drafting, and editing to effectively communicate your ideas.'
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Display the skill cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {Object.keys(skillDescriptions).map((skill, index) => (
          <motion.div
            key={skill}
            className="bg-orange-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-4"
            onClick={() => handleCardClick(skill)}
            initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }} // Left or right entrance
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }} // Fade out
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Card
              img={{ listen: i3, speak: i4, read: i1, write: i2 }[skill]}
              name={skill.charAt(0).toUpperCase() + skill.slice(1)}
              description={skillDescriptions[skill]}
            />
          </motion.div>
        ))}
      </motion.div>
      {/* Modal for difficulty selection */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black text-white bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-purple-400 text-white rounded-lg shadow-lg p-8 max-w-lg w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Select Difficulty for {selectedSkill.charAt(0).toUpperCase() + selectedSkill.slice(1)}
            </h2>
            <Radio onDifficultyChange={handleDifficultyChange} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
export default HomeSkills;