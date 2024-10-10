import React, { useEffect } from 'react';
import { auth } from './Backend/firebase/firebase'; // Adjust this import based on your structure
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        // Reload user to get updated information
        await user.reload();

        // Check if the email is verified
        if (user.emailVerified) {
          clearInterval(checkVerification); // Stop checking
          navigate('/'); // Redirect to home if verified
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(checkVerification); // Cleanup interval on unmount
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // After logout, navigate to the sign-in page or any other page you want
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
