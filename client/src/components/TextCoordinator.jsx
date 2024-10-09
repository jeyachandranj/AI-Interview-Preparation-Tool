import { useState, useEffect } from 'react';
import SpeakingTest from '../pages/Speaking';
import ReadingTest from '../pages/Reading';
import ListeningTest from '../pages/Listening';
import './TextCoordinator.css';
const TestCoordinator = ({ selectedSkills }) => {
  const [currentTest, setCurrentTest] = useState('speaking');
  const [timeRemaining, setTimeRemaining] = useState(30); // 1 minute for testing
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setShowPopup(true);
    }
  }, [timeRemaining]);
  const handleNextTest = () => {
    setShowPopup(false);
    setTimeRemaining(30); // Reset timer for the next test
    switch (currentTest) {
      case 'speaking':
        setCurrentTest('reading');
        break;
      case 'reading':
        setCurrentTest('listening');
        break;
      case 'listening':
        setCurrentTest('completed');
        break;
      default:
        break;
    }
  };
  const renderCurrentTest = () => {
    switch (currentTest) {
      case 'speaking':
        return selectedSkills.speak ? <SpeakingTest /> : <h2>Please select Speaking Test.</h2>;
      case 'reading':
        return selectedSkills.read ? <ReadingTest /> : <h2>Please select Reading Test.</h2>;
      case 'listening':
        return selectedSkills.listen ? <ListeningTest /> : <h2>Please select Listening Test.</h2>;
      case 'completed':
        return <h2 className="text-center">All tests completed! Thank you.</h2>;
      default:
        return null;
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full mx-auto"
      style={{ background: `url('../assets/backGround.svg') no-repeat center center fixed`, backgroundSize: 'cover' }}
    >
      <div className="w-full mb-4 text-center" style={{width:'1200px'}}>
        <h1 className="text-2xl font-bold text-red-800 mb-2">
          {currentTest === 'completed' ? "Test Completed!" : `${currentTest.charAt(0).toUpperCase() + currentTest.slice(1)} Test`}
        </h1>
        <p className="text-lg text-white">Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
      </div>
      <div className="flex-grow max-w-lg w-full">
        {renderCurrentTest()}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black">
          <div className=" rounded-lg shadow-lg p-6 max-w-sm w-full z-10">
            <h2 className="text-xl font-bold text-center text-purple-800 mb-2">Time's Up!</h2>
            <p>Your time for the {currentTest} test is complete.</p>
            <button className="mt-4 w-full bg-purple-800 text-white font-semibold rounded-lg p-2" onClick={handleNextTest}>
              Next Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TestCoordinator;