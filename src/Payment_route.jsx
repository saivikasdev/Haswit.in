import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

const Payment_route = ({ children, navigate }) => {
  const cookies = new Cookies();

  useEffect(() => {
    const checkUserDetails = async () => {
      const docRef = doc(db, 'All_users', cookies.get('user').phoneNumber);
      const docSnap = await getDoc(docRef);

      if (!cookies.get('user').phoneNumber) {
        navigate('/');
      }
    };

    checkUserDetails();
  }, [cookies, navigate]);

  return children;
};

export default Payment_route;