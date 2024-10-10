import React from 'react';
import '../Skill/Para.css';

const Para = ({ text, onNext }) => {
  return (
    <div className="reading-body" style={{width:"1000px"}} >
      <div className="reading-container ">
        <p className="reading-paragraph">{text}</p>
      </div>
    </div>
  );
};

export default Para;
