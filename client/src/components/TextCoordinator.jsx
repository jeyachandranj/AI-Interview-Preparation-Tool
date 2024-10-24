import { useState, useEffect } from 'react';
import SpeakingTest from '../pages/Speaking';
import ReadingTest from '../pages/Reading';
import ListeningTest from '../pages/Listening';
import WritingTest from '../pages/Writing';
import './TextCoordinator.css';

const TestCoordinator = ({ selectedSkills }) => {
  const [currentTest, setCurrentTest] = useState('speaking');
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds for testing
  const [showPopup, setShowPopup] = useState(false);
  const [scores, setScores] = useState({
    listening_score: 0,
    reading_score: 0,
    writing_score: 0, // You can modify this if you have a writing test
    speaking_score: 0,
  });

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
        // Simulate getting score for speaking test
        setScores((prev) => ({ ...prev, speaking_score: Math.floor(Math.random() * 10) })); // Replace with actual score
        setCurrentTest('reading');
        break;
      case 'reading':
        // Simulate getting score for reading test
        setScores((prev) => ({ ...prev, reading_score: Math.floor(Math.random() * 10) })); // Replace with actual score
        setCurrentTest('listening');
        break;
      case 'listening':
        // Simulate getting score for listening test
        setScores((prev) => ({ ...prev, listening_score: Math.floor(Math.random() * 10) })); // Replace with actual score
        setCurrentTest('completed');
        break;
      case 'completed':
        handleSubmitScores(); // Call to submit scores when tests are completed
        break;
      default:
        break;
    }
  };

  const handleSubmitScores = async () => {
    try {
      const response = await fetch('http://localhost:3000/update-skill-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scores),
      });
     
      if (!response.ok) {
        throw new Error('Failed to update scores');
      }

      const data = await response.json();
      console.log('Scores updated successfully:', data);
      // Optionally, show a success message or redirect the user
    } catch (error) {
      console.error('Error submitting scores:', error);
      // Optionally, show an error message
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
      case 'writing':
        return selectedSkills.write ? <WritingTest /> : <h2>Please select Listening Test.</h2>;
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
      <div className="w-full mb-4 text-center" style={{ width: '1200px' }}>
        <h1 className="text-2xl font-bold text-red-800 mb-2">
          {currentTest === 'completed' ? "Test Completed!" : `${currentTest.charAt(0).toUpperCase() + currentTest.slice(1)} Test`}
        </h1>
        <p className="text-lg text-red">Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
      </div>
      <div className="flex-grow max-w-lg w-full">
        {renderCurrentTest()}
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black">
          <div className="rounded-lg shadow-lg p-6 max-w-sm w-full z-10">
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
