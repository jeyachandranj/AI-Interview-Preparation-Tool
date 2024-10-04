
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './yesorno.module.css'; // The CSS module for styling


function Yesorno() {
    const navigate = useNavigate();

    const handleExistingResume = () => {
        navigate('/UploadPage'); // Navigate to the UploadPage if "Yes" is selected
    };

    const handleBuildFromScratch = () => { 
        navigate('/display'); // Navigate to DisplayPage directly if "No" is selected
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.progressBar}>
                <div className={`${styles.step} ${styles.active}`}>1</div>
                <div className={styles.line}></div>
                <div className={styles.step}>2</div>
                <div className={styles.line}></div>
                <div className={styles.step}>3</div>
            </div>

            <div className={styles.imageContainer}>
                <img
                    src="src/assets/profileimage.jpg"
                    alt="Profile"
                    className={styles.profileImage}
                />
            </div>
            <h2 className={styles.heading}>
                Do you have an existing resume to use as a starting point?
            </h2>

            <div className={styles.buttonContainer}>
                <button className={styles.yesButton} onClick={handleExistingResume} style={{width:"80px"}}>
                    Yes
                </button>
                <button className={styles.noButton} onClick={handleBuildFromScratch} style={{width:"80px"}}>
                    No
                </button>
            </div>
        </div>
    );
}

export default Yesorno;
