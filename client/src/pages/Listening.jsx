import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Confetti from 'react-confetti';
import videos from '../components/Skill/videos.json';
import QuestionPalette from '../components/Skill/QuestionPalette';
import './Listening.css';
// import starImage from '../assets/star.gif'; // Ensure you have this image in the specified directory
// import emptyStarImage from '../assets/empty-star.jpeg'; // Optional: Include an empty star image for unachieved scores

function Listening() {
  const [randomVideo, setRandomVideo] = useState(null);
  const [showQuestionPage, setShowQuestionPage] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [paragraph, setParagraph] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [flippedLetters, setFlippedLetters] = useState(new Array(20).fill(false));

  // Fetch random video and generate questions
  useEffect(() => {
    const selectRandomVideo = () => {
      const randomIndex = Math.floor(Math.random() * videos.length);
      setRandomVideo(videos[randomIndex]);
    };
    selectRandomVideo();
  }, []);

  useEffect(() => {
    if (randomVideo) {
      fetchParagraphAndGenerateQuestions(randomVideo.subtitle);
    }
  }, [randomVideo]);

  const fetchParagraphAndGenerateQuestions = async (subtitle) => {
    try {
      const response = await fetch('http://localhost:3000/listen-generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paragraph: subtitle }),
      });
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      setParagraph(data.paragraph);
      setQuestions(data.questions.questions);
      setShowQuestionPage(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Score calculation on submit
  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (question.answer === selectedAnswers[index]) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Star rendering function
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < questions.length; i++) {
      stars.push(
        // <img
        //   key={i}
        //   src={i < score ? starImage : emptyStarImage} // Show full star for correct answers
        //   alt="star"
        //   className="star-icon"
        // />
      );
    }
    return stars;
  };

  // Navigation logic
  const handleNextQuestion = () => currentQuestionIndex < questions.length - 1 && setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  const handlePreviousQuestion = () => currentQuestionIndex > 0 && setCurrentQuestionIndex((prevIndex) => prevIndex - 1);

  // Handle letter flipping animation
  const handleLetterClick = (index) => {
    const newFlippedLetters = [...flippedLetters];
    newFlippedLetters[index] = !newFlippedLetters[index];
    setFlippedLetters(newFlippedLetters);
  };

  const title = "";

  return (
    <div className="App">
      {/* Animated Title */}
      <h1 className="title-heading">
        {title.split("").map((letter, index) => (
          <span
            key={index}
            className={`letter ${flippedLetters[index] ? 'flipped' : ''}`}
            onClick={() => handleLetterClick(index)}
            style={{ animationDelay: `${index * 0.1}s` }} // Optional delay for the animation
          >
            {letter}
          </span>
        ))}
      </h1>

      {/* Video and Question Page */}
      {randomVideo && (
        <div className="cord" style={{height:"700px",marginLeft:'-90px'}}>
          <div className="flex-container" >
            <div className="player-wrapper" style={{height:"600px"}}>
              <ReactPlayer
                className="react-player"
                url={randomVideo.url}
                controls={true}
                config={{
                  youtube: {
                    playerVars: { modestbranding: 1, rel: 0, showinfo: 0 },
                  },
                }}
                width="100%"
                height="100%"
              />
            </div>

            {/* Questions Display */}
            {showQuestionPage && (
              <div className="question-page" style={{height:"600px",width:"800px"}}>
                <QuestionPalette
                  totalQuestions={questions.length}
                  currentQuestion={currentQuestionIndex}
                  onSelectQuestion={(index) => setCurrentQuestionIndex(index)}
                  selectedAnswers={selectedAnswers}
                />
                <div className="questions-container" style={{height:"600px",width:" 500px"}}>
                  <div className="question-navigation">
                    <h2 className="questions-header">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                  </div>
                  {questions && questions.length > 0 && (
                    <div className="question-block">
                      <p className="question-text"><strong>Q{currentQuestionIndex + 1}:</strong> {questions[currentQuestionIndex].question}</p>
                      <div className="options-container">
                        {Object.keys(questions[currentQuestionIndex].options).map((optionKey, i) => (
                          <label key={i} className="option-label">
                            <input
                              type="radio"
                              name={`question-${currentQuestionIndex}`}
                              value={optionKey}
                              onChange={(e) => {
                                const newAnswers = [...selectedAnswers];
                                newAnswers[currentQuestionIndex] = e.target.value;
                                setSelectedAnswers(newAnswers);
                              }}
                              checked={selectedAnswers[currentQuestionIndex] === optionKey}
                              className="option-input"
                            />
                            {questions[currentQuestionIndex].options[optionKey]}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="navigation-buttons">
                  <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="nav-button">Prev</button>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button onClick={handleNextQuestion} className="nav-button">Next</button>
                  ) : (
                    <button onClick={handleSubmit} className="nav-button">Submit</button>
                  )}
                </div>

                {/* Score Modal with Stars */}
                {isModalOpen && (
                  <div className="score-modal">
                    <Confetti />
                    <div className="score-modal-content">
                      <div className="close-button" onClick={closeModal}>X</div>
                      <div className="stars-display-horizontal">
  {renderStars()}
</div>

                      <h3 className="score">Your Score: {score} / {questions.length}</h3>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listening;
