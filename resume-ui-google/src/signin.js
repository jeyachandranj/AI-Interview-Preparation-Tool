import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from './Backend/firebase/firebase'; // Include Firestore
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
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
        // Check if the email is verified
        if (!user.emailVerified) {
          // Redirect to VerifyEmail page
          navigate('/verify-email');
        } else {
          // Fetch the role from Firestore
          fetchUserRole(user.uid);
        }
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [navigate]);

  const fetchUserRole = async (uid) => {
    try {
      const userDocRef = doc(firestore, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;

        // Redirect based on role
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        setError('User role not found.');
      }
    } catch (error) {
      setError('Error fetching user role.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Firebase Email/Password Sign-In
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Firebase will automatically redirect based on the email verification in useEffect
    } catch (error) {
      setError("Invalid Login Credentials"); // Display error if sign-in fails
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsSigningIn(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user's email is verified after Google sign-in
      if (!user.emailVerified) {
        navigate('/verify-email'); // Redirect to VerifyEmail page
      } else {
        // Fetch the role from Firestore after Google Sign-In
        fetchUserRole(user.uid);
      }
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