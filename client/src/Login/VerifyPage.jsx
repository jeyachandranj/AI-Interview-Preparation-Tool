import React, { useEffect } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(checkVerification);
          navigate('/');
        }
      }
    }, 5000);

    return () => clearInterval(checkVerification);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Please Verify Your Email</h2>
      <p>We have sent a verification email to your registered email address. Please check your inbox and verify your email.</p>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default VerifyEmail;