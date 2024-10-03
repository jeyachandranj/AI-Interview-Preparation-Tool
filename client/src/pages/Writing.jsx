import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Writing.css';
 

const Writing = () => {
  const [question, setQuestion] = useState('');
  const [letter, setLetter] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/question');
      setQuestion(response.data.question);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/submit', { letter });
      setFeedback(response.data);
      setShowFeedback(true);
    } catch (error) {
      console.error('Error submitting letter:', error);
    }
  };

  const closeFeedback = () => {
    setShowFeedback(false);
  };

  return (
    <div className="App">
      <div className='bg'>
          <h1>Writing Comprehension</h1>
          {question && <p><strong>Question:</strong> {question}</p>}
          <form onSubmit={handleSubmit}>
          <textarea
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          placeholder="Write your letter here..."
          />
          <button type="submit">Submit</button>
          </form>
          {showFeedback && (
        <>
          <div className="overlay" onClick={closeFeedback}></div>
          <div className="feedback-popup">
            <button className="close-button" onClick={closeFeedback}>&times;</button>
            <h2>Feedback</h2>
            <p><strong>Grammar Mistakes:</strong> {feedback.grammarMistakes}</p>
            <p><strong>Spelling Mistakes:</strong> {feedback.spellingMistakes}</p>
            <p><strong>Total Marks:</strong> {feedback.totalMarks} / 25</p>
            <p><strong>Feedback:</strong> {feedback.feedback}</p>
          </div>
        </>
      )}
     

      </div>  
    </div>
  );
};

export default Writing;
