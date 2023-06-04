import React, { useEffect, useState } from 'react'
import './About_me.css'
import { db } from '../../../firebase-config';
import { getDoc,doc } from 'firebase/firestore';
import Cookies from 'universal-cookie';
const About_me = () => {

  const cookies = new Cookies();
const [about_us, setabout_us] = useState('')
  const fetchDetails = async () => {
    

    const docRef = doc(db, "Students", cookies.get('user').phoneNumber);
    const docSnap = await getDoc(docRef);
    
    console.log("Document data:", docSnap.data().Name);
    if (docSnap.exists()) {
      setabout_us(docSnap.data().about)
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    
    console.log("No such document!");
  
  };

  useEffect(() => {
    
    fetchDetails()
  }, [])
  
  return (
    <div className="About_me">
       {about_us}
               
    </div>
  )
}

export default About_me