import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authentication, db } from '../firebase-config';
import Cookies from 'universal-cookie';
import { doc, getDoc } from 'firebase/firestore';

const Private_routes = ({ children }) => {
  const cookies = new Cookies();
  const docRef = doc(db, 'Students', cookies.get('user').phoneNumber);
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    const checkUserDetails = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Document exists, do nothing
      } else {
        // Document does not exist, navigate to /TID
        navigate('/'); // Use the navigate function here
      }
    };

    checkUserDetails();
  }, [docRef, navigate]); // Add navigate to the dependencies array

  return children;
};

export default Private_routes;