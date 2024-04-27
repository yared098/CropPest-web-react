import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to authentication changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // Optionally, you can add a loader here while waiting for the auth state
    return <div>Loading...</div>;
  }

  // Navigate to login page if there is no user authenticated
  return user ? children : <Navigate to="/" />;
}

export default PrivateRoute;
