import React, { useState } from 'react';
import '../Skill/Questions.css';

const Questions = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.questions.length).fill(""));
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [visitedQuestions, setVisitedQuestions] = useState(Array(questions.questions.length).fill(false));

  // Handle answer change
  const handleChange = (e, index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = e.target.value;
    setSelectedAnswers(newAnswers);

    // Mark question as answered and visited
    const newVisited = [...visitedQuestions];
    newVisited[index] = true; // Mark this question as visited
    setVisitedQuestions(newVisited);
  };

  // Handle form submit
  const handleSubmit = () => {
    let newScore = 0;
    questions.questions.forEach((question, index) => {
      if (question.answer === selectedAnswers[index]) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Mark the next question as visited
      const newVisited = [...visitedQuestions];
      newVisited[currentQuestionIndex + 1] = true; // Mark next question as visited
      setVisitedQuestions(newVisited);
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Mark the previous question as visited
      const newVisited = [...visitedQuestions];
      newVisited[currentQuestionIndex - 1] = true; // Mark previous question as visited
      setVisitedQuestions(newVisited);
    }
  };

  // Jump to a specific question
  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    const newVisited = [...visitedQuestions];
    newVisited[index] = true; // Mark this question as visited
    setVisitedQuestions(newVisited);
  };

  return (
    <div className="questions-container" style={{height:"600px",width:"1200px"}}>
      <h2 className="questions-header">Questions</h2>

      {/* Question Number Navigation */}
      <div className="question-navigation">
        {questions.questions.map((_, index) => {
          let buttonClass = '';

          // Check if the question is answered
          if (selectedAnswers[index]) {
            buttonClass = 'answered';
          } else if (visitedQuestions[index]) {
            buttonClass = 'visited';
          } else {
            buttonClass = 'not-visited';
          }

          return (
            <button
              key={index}
              onClick={() => handleJumpToQuestion(index)}
              className={`question-number-btn ${buttonClass} ${index === currentQuestionIndex ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Current Question */}
      {Array.isArray(questions.questions) && questions.questions.length > 0 ? (
        <div className="question-block">
          <p className="question-text">
            <strong>Q{currentQuestionIndex + 1}:</strong> {questions.questions[currentQuestionIndex].question}
          </p>
          <div className="options-container">
            {Object.keys(questions.questions[currentQuestionIndex].options).map((optionKey, i) => (
              <label key={i} className="option-label">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={optionKey}
                  onChange={(e) => handleChange(e, currentQuestionIndex)}
                  checked={selectedAnswers[currentQuestionIndex] === optionKey}
                  className="option-input"
                />
                {questions.questions[currentQuestionIndex].options[optionKey]}
              </label>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="question-navigation-buttons">
            <button onClick={handlePrevious} className="nav-button" disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button onClick={handleNext} className="nav-button" disabled={currentQuestionIndex === questions.questions.length - 1}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No questions available.</p>
      )}

      {/* Submit Button */}
      {currentQuestionIndex === questions.questions.length - 1 && (
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      )}

      {/* Score Modal */}
      {isModalOpen && (
        <div className="score-modal" style={{ display: 'flex' }}>
          <div className="score-modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h3>Your Score: {score} / {questions.questions.length}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
