import React from 'react';
import './QuestionPalette.css'; // Ensure this file is imported for styles

const QuestionPalette = ({ totalQuestions, currentQuestion, onSelectQuestion, selectedAnswers }) => {
  return (
    <div className="question-palette" >
      <h1 className="palette-heading">Question Palette</h1>
      <div className="palette-grid">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <button
            key={index}
            className={`question-button ${currentQuestion === index ? 'active' : ''} ${selectedAnswers[index] ? 'answered' : ''}`}
            onClick={() => onSelectQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPalette;
