import React, { useState } from 'react';
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
import Signin from './Login/signin';
import Signup from './Login/signup';
import VerifyEmail from './Login/VerifyPage';
import FaceDetection from "./components/FaceDetection";
import Layout from "./components/Layout";
import UserSelect from "./components/UserSelect";
import Protected from "./components/Protected";

function App() {
  const location = useLocation();
  const [resumeData, setResumeData] = useState(null);

  return (
    <div className="App">
      <Routes>
        {/* Authentication Pages */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Existing App Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<Yesorno />} />
        <Route path="/UploadPage" element={<UploadPage setResumeData={setResumeData} />} />
        <Route path="/display" element={<DisplayPage resumeData={resumeData} />} />
        <Route path="/resume-builder" element={<ResumeBuilder resumeData={resumeData} />} />
        <Route path="/interview" element={<Advance />} />
        <Route path="/skills" element={<HomeSkills />} />
        <Route path="/read" element={<Reading />} />
        <Route path="/write" element={<Writing />} />
        <Route path="/listen" element={<Listen />} />

        <Route path="/" element={<Layout />}>
          <Route path="/uploadface" element={<UserSelect />} />
          <Route path="face" element={<FaceDetection />} />
          <Route path="protected" element={<Protected />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;