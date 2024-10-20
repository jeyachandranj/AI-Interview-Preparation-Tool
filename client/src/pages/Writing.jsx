import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-10 w-2000px  flex flex-col">
        <h1 className="text-2xl font-bold text-center text-purple-800 mb-4">Writing Comprehension</h1>
        {question && <p className="text-gray-700 mb-4"><strong>Question:</strong> {question}</p>}
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            placeholder="Write your letter here..."
            className="w-full h-48 p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-20 h-12 bg-purple-800 text-white font-semibold rounded-lg transition duration-200 hover:bg-purple-700"            style={{marginTop:"200px"}}
          >
            Submit
          </button>
        </form>
        {showFeedback && (
          <>
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeFeedback} style={{backgroundImage: "url('/assets/backGround.svg')"}}></div>
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-10">
                <button className="absolute top-2 right-2 text-gray-500" onClick={closeFeedback}>&times;</button>
                <h2 className="text-xl font-bold text-center text-purple-800 mb-2">Feedback</h2>
                <p><strong>Grammar Mistakes:</strong> {feedback.grammarMistakes}</p>
                <p><strong>Spelling Mistakes:</strong> {feedback.spellingMistakes}</p>
                <p><strong>Total Marks:</strong> {feedback.totalMarks} / 25</p>
                <p><strong>Feedback:</strong> {feedback.feedback}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Writing;