import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authentication, db } from '../firebase-config';
import Cookies from 'universal-cookie';
import { doc, getDoc } from 'firebase/firestore';

const Private_routes = ({ children }) => {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const docRef = user?.phoneNumber ? doc(db, 'Students', user.phoneNumber) : null;
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserDetails = async () => {
      if (user && user.phoneNumber) {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docRef != null) {
        } else {
          // Document does not exist, navigate to /TID
          navigate('/');
        }
      } else {
        // User cookie or phoneNumber property is not available, navigate to /TID
        navigate('/');
      }
    };

    if (docRef) {
      checkUserDetails();
    }
    else{
      
      navigate('/Login');
    }
  }, [docRef, navigate, user]);

  return children;
};

export default Private_routes;
