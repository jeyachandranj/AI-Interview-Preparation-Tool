import React, { useState, useEffect } from 'react';
import axios from 'axios';
import questions from './question.json';
import ScoreDisplay from './ScoreDisplay';
const SpeechRecorder = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [topic, setTopic] = useState('');
  const [scores, setScores] = useState({
    overall: 0,
    vocabularyComplexity: 'N/A',
    vocabularyRepetition: 'N/A',
    pronunciation: 0,
    taskResponse: 0,
    fluency: 0,
    lexical: 0,
    grammar: 0,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  useEffect(() => {
    if (!recognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }
    fetchRandomQuestion();
    recognition.lang = 'en-US';
    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onresult = (event) => {
      const result = event.results[event.resultIndex];
      if (result.isFinal) {
        setTranscript(prev => prev + ' ' + result[0].transcript);
      }
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  }, [recognition]);
  const fetchRandomQuestion = () => {
    if (questions.length === 0) {
      console.error('No questions available');
      return;
    }
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setTopic(randomQuestion.topic);
  };
  const startListening = () => {
    setTranscript('');
    recognition.start();
  };
  const stopListening = () => {
    recognition.stop();
  };
  const checkMySpeech = () => {
    setIsAnalyzing(true);
    axios.post('http://localhost:3000/analyze', { text: transcript, topic: topic })
      .then(response => {
        if (response.data) {
          setScores({
            overall: response.data.overallScore?.score || 0,
            vocabularyComplexity: response.data.vocabularyComplexity?.score || 'N/A',
            vocabularyRepetition: response.data.vocabularyRepetition?.score || 'N/A',
            pronunciation: response.data.pronunciation?.score || 0,
            taskResponse: response.data.taskResponse?.score || 0,
            fluency: response.data.fluency?.score || 0,
            lexical: response.data.lexicalResource?.score || 0,
            grammar: response.data.grammaticalRangeAccuracy?.score || 0,
          });
        } else {
          console.error('Invalid response format: ', response.data);
        }
      })
      .catch(error => {
        console.error('Error sending text to backend:', error);
      })
      .finally(() => {
        setIsAnalyzing(false);
      });
  };
  const handleFeedback = () => {
    alert("Feedback button clicked!");
  };
  return (
    <div className="h-screen flex items-center justify-center p-6 font-bold" >
      <div className="flex space-x-4" style={{width:"1500px",marginLeft:"450px"}}>
        {/* Speech Recorder Container */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full" >
          <div className="input-group">
            <label className="topic-label">Topic:</label>
            <p className="topic-display">{topic}</p>
          </div>
          <div className="input-group">
            <label className="answer-label">Answer</label>
            <textarea
              value={transcript}
              placeholder="Click the mic icon to start recording..."
              onChange={(e) => setTranscript(e.target.value)} // Allow editing
              className="answer-textarea w-full h-24 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="controls">
            <button onClick={startListening} className={`mic-button ${isListening ? 'active' : ''} bg-blue-500 text-white py-2 px-4 rounded`} disabled={isListening}>
              <i className="fa fa-microphone"></i>
              Start
            </button>
            <button onClick={stopListening} className="mic-button stop-button bg-red-500 text-white py-2 px-4 rounded" disabled={!isListening}>Stop</button>
          </div>
          <p className="status-text">{isListening ? 'Recording...' : '0s'}</p>
          <button onClick={checkMySpeech} className="check-button bg-green-500 text-white py-2 px-4 rounded" disabled={isAnalyzing}>Check My Speech</button>
          <button onClick={handleFeedback} className="feedback-button bg-gray-500 text-white py-2 px-4 rounded">Feedback</button>
        </div>
        {/* Score Display Container */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-lg font-bold">Overall Band Score</h2>
          <ScoreDisplay scores={scores} />
        </div>
      </div>
    </div>
  );
};
export default SpeechRecorder;