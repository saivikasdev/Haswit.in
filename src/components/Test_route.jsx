import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { authentication, db } from '../firebase-config'
import Cookies from 'universal-cookie';
import { doc, getDoc } from 'firebase/firestore'
const Test_route = ({children}) => {

  const cookies = new Cookies();

   useEffect(() => {


      const fetch_current = async () =>{
         const docRef = doc(db,cookies.get('session_month').toString(), cookies.get('session_date').toString());
     const docSnap = await getDoc(docRef);
     if (docSnap.exists()) {
       cookies.set('File', docSnap.data().file, { path: '/' })
   
       cookies.set('Test', docSnap.data().test, { path: '/' })
       console.log(docSnap.data().file);
     } else {
       // doc.data() will be undefined in this case
       cookies.set('File', false, { path: '/' })
   
       cookies.set('Test', 'false', { path: '/' })
      }
     }
     fetch_current();
     const fetchData = async () => {
      const docRef = doc(db, cookies.get("session_month").toString(), cookies.get("session_date").toString());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        cookies.set('Status', docSnap.data().Students.includes(cookies.get("user").phoneNumber), { path: '/' })
  
        console.log(docSnap.data().session_file);
      } else {
        
        cookies.set('Status',false, { path: '/' })
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  
  
  
    }
  fetchData();
  
  
   }, [])
   const session_date=cookies.get('session_date');
   const session_month =cookies.get('session_month');
   const file=cookies.get('File');
    const test=cookies.get('Test');

   
   const [File, setFile] = useState();
   const [Test, setTest] = useState();
  


  console.log(File)
   if(1===1){
    return children;
   }
   else{
    console.log(session_date,session_month,file,test)
    return <Navigate to={"/"}/>
   }
   
}

export default Test_route;