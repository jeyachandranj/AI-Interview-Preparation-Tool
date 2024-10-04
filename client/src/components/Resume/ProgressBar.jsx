// ProgressBar.js
import React from 'react';
import styles from './ProgressBar.module.css'; // Import your styles for the progress bar

const ProgressBar = ({ currentSection, totalSections, sectionName }) => {
  const percentage = (currentSection / totalSections) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressLabel}>{sectionName}</div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${percentage}%`, backgroundColor: 'orange' }} // Set the background color to orange
        />
      </div>
      <div className={styles.progressPercentage}>{`${Math.round(percentage)}%`}</div>
    </div>
  );
};

export default ProgressBar;
