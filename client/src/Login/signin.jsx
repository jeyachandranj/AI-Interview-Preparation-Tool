import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';  // Import axios for API calls
import './LoginForm.css';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.emailVerified) {
          navigate('/verify-email');
        } else {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // After successful login, send the email to the backend API to update the skills score
      await updateSkillsScore();
    } catch (error) {
      setError("Invalid Login Credentials");
    }
  };

  const updateSkillsScore = async () => {
    try {
      const response = await axios.post('/update-skill-score', {
        email: email,  // Pass email here
        listening_score: 0, // Example scores, replace with actual values
        reading_score: 0,
        writing_score: 0,
        speaking_score: 0,
      });

      console.log('Skills score updated:', response.data);
    } catch (error) {
      console.error('Error updating skill score:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsSigningIn(true);

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address to reset the password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input 
            type="email" 
            placeholder="example.email@gmail.com" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder="Enter at least 8+ characters" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="remember-forgot">
          <button type="button" onClick={handleForgotPassword} className="forgot-password-btn">
            Forgot password?
          </button>
        </div>
        <div className="remember-forgot">
          <Link to="/signup" className="register-link">Don't have an account? Create here</Link>
        </div>
        <button type="submit" className="signin-btn">Sign in</button>
        <button 
          type="button" 
          onClick={handleGoogleSignIn} 
          className={`signin-btn ${isSigningIn ? 'disabled' : ''}`}
          disabled={isSigningIn}
        >
          {isSigningIn ? 'Signing In...' : 'Continue with Google'}
        </button>
      </form>
    </div>
  );
}

export default Signin;
