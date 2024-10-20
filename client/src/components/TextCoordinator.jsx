import { useState, useEffect } from 'react';
import SpeakingTest from '../pages/Speaking';
import ReadingTest from '../pages/Reading';
import ListeningTest from '../pages/Listening';
import WrittingTest from '../pages/Writing';
import './TextCoordinator.css';
import Confetti from "react-confetti";
import Model from '../components/Modal'
const TestCoordinator = ({ selectedSkills }) => {
  const [currentTest, setCurrentTest] = useState('listening');
  const [timeRemaining, setTimeRemaining] = useState(15); // 1 minute for testing
  const [showPopup, setShowPopup] = useState(false);
  const handleCopy = (event) => {
    event.preventDefault();
    alert('Copying is disabled!');
  };
  const handleContextMenu = (event) => {
    event.preventDefault();
    alert('Right Click is disabled!');
  }
  const handlePaste = (event) => {
    event.preventDefault();
    alert('Pasting is disabled!');
  };
  const handleCut = (event) => {
    event.preventDefault();
    alert('Cut is disabled!');
  };
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
  const [isChatbotReady, setIsChatbotReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const handleFullscreenChange = () => {
    // Check if the document is in fullscreen mode
    setIsFullscreen(!!document.fullscreenElement);
  };
  const requestFullscreen = () => {
    const elem = document.documentElement; // Use the whole document
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
    setShowFullscreenModal(false);
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    setIsFullscreen(!!document.fullscreenElement);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);
  useEffect(() => {
    if (!isFullscreen) {
      setShowFullscreenModal(true);
    }
  }, [isFullscreen]);

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
    setTimeRemaining(15); // Reset timer for the next test
    switch (currentTest) {
      case 'listening':
        setCurrentTest('speaking');
        break;
      case 'speaking':
        setCurrentTest('reading');
        break;
      case 'reading':
        setCurrentTest('writing');
        break;
      case 'writing':
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
      case 'writing':
        return selectedSkills.listen ? <WrittingTest /> : <h2>Please select Writting Test.</h2>;
      case 'completed':
        return <h2 className="text-center"><Confetti /></h2>;
      default:
        return null;
    }
  };

  return (
    <div className="test-coordinator-container" onCopy={handleCopy}
      onCut={handleCut}
      onPaste={handlePaste}
      onContextMenu={handleContextMenu}>
      <Model
        isOpen={showFullscreenModal}
        onClose={() => setShowFullscreenModal(false)}
        onConfirm={requestFullscreen} />
      <div className="w-full mb-4 text-center" style={{ width: '1000px' }}>
        <h1 className="text-2xl font-bold text-red-800 mb-2">
          {currentTest === 'completed' ? "Test Completed!" : `${currentTest.charAt(0).toUpperCase() + currentTest.slice(1)} Test`}
        </h1>
        <p className="test-timer text-black">Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
      </div>

      <div className="flex-grow max-w-lg w-full">
        {renderCurrentTest()}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
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