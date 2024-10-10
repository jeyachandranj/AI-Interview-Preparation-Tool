import React from 'react';
import { auth } from './Backend/firebase/firebase'; // Adjust this import based on your structure
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // After logout, navigate to the sign-in page or any other page you want
      navigate('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };



  return(
  <div>
  <h1>Welcome, Admin!</h1>
  
  <button onClick={handleLogout} className="logout-btn">
        Logout
  </button>
  </div>
  )

}



export default AdminPage;
