import React, { useEffect, useState } from 'react';
import { auth } from './Backend/firebase/firebase'; // Adjust this import based on your structure
import { onAuthStateChanged, signOut } from 'firebase/auth';

function UserPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || 'User'); // Use display name or default to 'User'
      } else {
        setUserName(''); // Clear the username if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // You may want to redirect or show a message after logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default UserPage;
