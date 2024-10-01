import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './UploadPage.module.css'; // Import the CSS module

function UploadPage({ setResumeData }) {
    const [file, setFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            console.error('No file selected!');
            return;
        }

        const data = new FormData();
        data.append('pdf_doc', file);
        setLoading(true); // Set loading to true when upload starts

        try {
            const response = await axios.post('http://localhost:5000/process', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResumeData(response.data); // Set parsed resume data
            navigate('/display'); // Navigate to display page
        } catch (error) {
            console.error('Error parsing the resume!', error);
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };

    const handleBuildFromScratch = () => {
        setResumeData({}); // Set empty resume data
        navigate('/display'); // Navigate to display page
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.progressBar}>
                <div className={styles.step}>1</div>
                <div className={styles.line}></div>
                <div className={`${styles.step} ${styles.active}`}>2</div>
                <div className={styles.line}></div>
                <div className={styles.step}>3</div>
            </div>
            {loading ? (
                <div className={styles.loadingScreen}>
                    <div className={styles.spinner}></div>
                    <p>Processing your resume, please wait...</p>
                </div>
            ) : (
 
                <div className={styles.uploadContainer}>
                  <h2>Upload Your Resume</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className={styles.inputFile}
                    />
                    <div className={styles.box} onClick={handleSubmit}>
                      Choose file
                    </div>
                  </form>
                  {/* {selectedFile && (
                    <p className={styles.fileName}>Selected file: {selectedFile}</p>
                  )} */}
                </div>         
            )}
        </div>
    );
}

export default UploadPage;
