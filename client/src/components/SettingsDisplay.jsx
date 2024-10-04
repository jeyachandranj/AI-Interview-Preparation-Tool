import React, { useState, useRef, useEffect } from "react";

const SettingsDisplay = ({ settings, setSettings, visible, setVisible }) => {
  const formRef = useRef(null);
  const [newSettings, setNewSettings] = useState(settings);
  const [isTabLockActive,setIsTabLockActive] = useState(false);
  const [tabSwitchCount,setTabSwitchCount] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);


  useEffect(() => {
    const handleVisibilityChange = () => {
        if (document.hidden && isTabLockActive) {
            alert('You cannot switch tabs after saving your settings.');
            // Increment the tab switch count
            setTabSwitchCount(prevCount => prevCount + 1);
        }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
}, [isTabLockActive]);

const handleSave = () => {
    setIsTabLockActive(true);
    console.log('Settings saved and tab switching is now restricted.');
};

  const updateSettings = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const updatedSettings = Object.fromEntries(formData.entries());

    const currentTime = Date.now();
    localStorage.removeItem('interviewStartTime');
    localStorage.setItem('interviewStartTime', currentTime);
    localStorage.removeItem('questionStartTime');
    console.log("Interview Started");

    if (validateUrl(e.target.link_to_resume.value)) {
      setSettings(updatedSettings);
      setVisible(false);
      await checkObjectDetection();
    } else {
      console.log("Invalid settings");
      formRef.current.classList.add("invalid");
    }
  };

  function validateUrl(url) {
    try {
      new URL(url);
      if (url.slice(-4) !== ".pdf") {
        console.log("Invalid url");
        return false;
      }
      return true;
    } catch (_) {
      console.log("Invalid url");
      return false;
    }
  }

  const checkObjectDetection = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/detect_objects"); // Flask API call
      const data = await response.json();

      if (data.detected === true) {
        // If the backend detects an object, show the popup
        setPopupVisible(true);
      }
    } catch (error) {
      console.error("Error during object detection:", error);
    }
  };

  

  return (
    <div className="settingsContainer" >
      <div className="closeButton" onClick={() => setVisible(false)}>
        <i className="fas fa-times">
          <h3 style={{ fontSize: "20px", marginTop: "10px" }}>X</h3>
        </i>
      </div>
      <h2 style={{ textAlign: "center",color:"white"}}>Settings</h2>
      <form className="settings" onSubmit={updateSettings} ref={formRef} >
        <div className="setting">
          <label htmlFor="job_title">Job Title</label>
          <input
            type="text"
            name="job_title"
            id="job_title"
            value={newSettings.job_title}
            required
            onChange={(e) => setNewSettings({ ...newSettings, job_title: e.target.value })}
          />
        </div>
        <div className="setting">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            name="company_name"
            id="company_name"
            value={newSettings.company_name}
            required
            onChange={(e) => setNewSettings({ ...newSettings, company_name: e.target.value })}
          />
        </div>
        <div className="setting">
          <label htmlFor="interviewer_name">Interviewer Name</label>
          <input
            type="text"
            name="interviewer_name"
            id="interviewer_name"
            value={newSettings.interviewer_name}
            required
            onChange={(e) => setNewSettings({ ...newSettings, interviewer_name: e.target.value })}
          />
        </div>

        <div className="setting">
          <label htmlFor="link_to_resume">Link to Resume</label>
          <input
            type="text"
            name="link_to_resume"
            id="link_to_resume"
            value={newSettings.link_to_resume}
            onChange={(e) => setNewSettings({ ...newSettings, link_to_resume: e.target.value })}
          />
        </div>

        <div className="setting">
          <label htmlFor="resume">Resume Title</label>
          <select
            name="resume"
            id="resume"
            value={newSettings.resume_title}
            onChange={(e) => setNewSettings({ ...newSettings, resume_title: e.target.value })}
          >
            <option value="skills">Skills</option>
            <option value="project">Project</option>
            <option value="hr">HR</option>
            <option value="all">All</option>
          </select>
        </div>

        <div className="setting__button">
          <button className="btn_outline" type="submit" style={{ width: "300px" }}  onClick={handleSave}>
            Save
          </button>
        </div>
      </form>



      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Interview is Ended</h2>
            <button onClick={() => setPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="videoFeed" style={{ position: "absolute", top: "10px", right: "10px", width: "300px", height: "200px", border: "2px solid #ccc" }}>
        <img
          src="http://127.0.0.1:5000/video_feed"
          alt="Video Stream"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      
    </div>
  );
};

export default SettingsDisplay;
