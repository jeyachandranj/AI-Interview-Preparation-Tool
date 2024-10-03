import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Advance from './pages/Advance';
import UploadPage from './components/Resume/UploadPage';
import DisplayPage from './components/Resume/DisplayPage';
import ResumeBuilder from './components/Resume/ResumeBuilder';
import Yesorno from './components/Resume/yesorno';
import LandingPage from './pages/LandingPage';
import HomeSkills from './pages/HomeSkills';
import Reading from './pages/Reading';
import Writing from './pages/Writing';
import Listen from './pages/Listening';
import Speaking from './pages/Speaking';
function App() {
  const location = useLocation();
  const [resumeData, setResumeData] = useState(null);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<Yesorno />} />
        <Route path="/UploadPage" element={<UploadPage setResumeData={setResumeData} />} />
        <Route path="/display" element={<DisplayPage resumeData={resumeData} />} />
        <Route path="/resume-builder" element={<ResumeBuilder resumeData={resumeData} />}/>
        <Route path="/interview" element={<Advance />} />
        <Route path="/skills" element={<HomeSkills />} />
        <Route path="/read" element={<Reading />} />
        <Route path="/write" element={<Writing />} />
        <Route path="/listen" element={<Listen/>}/>
        <Route path="/speak" element={<Speaking/>}/>
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
