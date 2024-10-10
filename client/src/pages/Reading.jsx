import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paragraph from '../components/Skill/Para';
import Questions from '../components/Skill/Questions';
import '../pages/Reading.css';
import logo from '../assets/loding.gif';

const Reading = () => {
  const [loading, setLoading] = useState(true);
  const [paragraph, setParagraph] = useState('');
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.post('http://localhost:3000/generate-content');
        const data = response.data;

        setParagraph(data.paragraph);
        setQuestions(data.questions);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from backend", error);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0; // Stop the timer when it reaches 0
        }
        return prevTime - 1; // Decrement the time left by 1 second
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Format time as MM:SS
  };

  return (
    <div className={loading ? 'page-center' : 'reading-background'}>
      {loading ? (
        <img src={logo} alt="Loading" className="loading-img" style={{marginLeft:"400px"}} />
      ) : (
        <div className="content-container">
          <div className="timer">{formatTimeLeft(timeLeft)}</div> {/* Display timer */}
          <div className="flex-container" style={{marginRight:"50px",width:"1200px"}}> 
            <Paragraph text={paragraph} />
            <Questions questions={questions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reading;
