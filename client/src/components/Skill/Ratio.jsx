import { useState } from "react";
import { motion } from "framer-motion";
const Radio = ({ onDifficultyChange }) => {
  const [selectedOption, setSelectedOption] = useState("easy");
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleConfirm = () => {
    onDifficultyChange(selectedOption);
  };
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gradient-to-r from-orange-200 to-blue-200 p-6 rounded-lg shadow-lg w-full max-w-md"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Title */}
      <h2 className="text-2xl font-extrabold mb-4 text-white">Select Difficulty</h2>
      <div className="space-y-4 w-full">
        {/* Easy */}
        <motion.div
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedOption("easy")}
        >
          <input
            className="h-5 w-5 text-orange-500"
            value="easy"
            name="difficulty-selector"
            id="easy"
            checked={selectedOption === "easy"}
            onChange={handleChange}
            type="radio"
          />
          <label
            className="ml-4 text-lg font-extrabold text-gray-700"
            htmlFor="easy"
          >
            Easy
          </label>
        </motion.div>
        {/* Medium */}
        <motion.div
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedOption("medium")}
        >
          <input
            className="h-5 w-5 text-orange-500"
            value="medium"
            name="difficulty-selector"
            id="medium"
            checked={selectedOption === "medium"}
            onChange={handleChange}
            type="radio"
          />
          <label
            className="ml-4 text-lg font-extrabold text-gray-700"
            htmlFor="medium"
          >
            Medium
          </label>
        </motion.div>
        {/* Hard */}
        <motion.div
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedOption("hard")}
        >
          <input
            className="h-5 w-5 text-orange-500"
            value="hard"
            name="difficulty-selector"
            id="hard"
            checked={selectedOption === "hard"}
            onChange={handleChange}
            type="radio"
          />
          <label
            className="ml-4 text-lg font-extrabold text-gray-700"
            htmlFor="hard"
          >
            Hard
          </label>
        </motion.div>
      </div>
      {/* Confirm Button */}
      <motion.button
        className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-green-700 flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.1 }}
        onClick={handleConfirm}
      >
        <span className="text-lg font-bold">Confirm</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
};
export default Radio;