import React,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Advance from './pages/Advance';
import UploadPage from './components/Resume/UploadPage';
import DisplayPage from './components/Resume/DisplayPage';
import ResumeBuilder from './components/Resume/ResumeBuilder';

function App() {
  const location = useLocation();
  const [resumeData, setResumeData] = useState(null);


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<UploadPage setResumeData={setResumeData} />} />
        <Route path="/display" element={<DisplayPage resumeData={resumeData} />} />
        <Route path="/resume-builder" element={<ResumeBuilder resumeData={resumeData} />}/>
        <Route path="/interview" element={<Advance />} />
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