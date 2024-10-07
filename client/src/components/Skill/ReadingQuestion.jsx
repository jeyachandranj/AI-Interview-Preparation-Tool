import React from 'react';
import './ReadingQuestion.css';

const ReadingQuestion = ({ questions }) => {
    console.log("Questions received:", questions);

    return (
        <div className="questions-container">
            {questions.map((questionObj, index) => (
                <div key={index} className="question-card">
                    <h2 className="question">{questionObj.question}</h2>
                    <div className="options">
                        {Object.entries(questionObj.options).map(([optionKey, optionValue]) => (
                            <div key={optionKey} className="option">
                                <input
                                    type="radio"
                                    id={`q${index}-${optionKey}`}
                                    name={`question-${index}`}
                                    value={optionKey}
                                />
                                <label htmlFor={`q${index}-${optionKey}`}>{optionValue}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReadingQuestion;
