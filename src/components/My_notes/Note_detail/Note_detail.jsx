import React from 'react'
import './Note_detail.css'
import Cookies from "universal-cookie";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Note_detail = () => {
  const [Note, setNote] = useState([])
  const [New_note, setNew_note] = useState(Note.note)
  const cookies = new Cookies();
   const fetchDetails = async () => {
    

      const docRef = doc(db, "Students", cookies.get('user').phoneNumber,'Notes',cookies.get('Note'));
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setNote(docSnap.data())
      } else {
        // doc.data() will be undefined in this case
      }
      
    
    };



    const Setdata = async (e) => {
      e.preventDefault();
      if (New_note.length > 15) {
        console.log(New_note);
        await setDoc(
          doc(db, 'Students', cookies.get('user').phoneNumber,'Notes',cookies.get('Note')),
          {
            Note:New_note,
  
          },
          { merge: true }
        ).then(() => {
          toast('Note saved', {
          position: toast.POSITION.BOTTOM_LEFT,
          className: 'toast-message'
      })
        })
    }

    else{
    }
  }
    useEffect(() => {
      
      fetchDetails()
    }, [])


   
  return (
  <div className="Note_detail">
   <div className="Note_detail_title">
      {Note.Note_title}
   </div>
   <div className="Note_session">
      
   {Note.session}
   </div>
   <form className='Note_form' onSubmit={Setdata}>
   <textarea
          value={New_note}
          onChange={(e)=>{
             setNew_note(e.target.value)


          }}
          type="text"
          defaultValue={Note.Note}
          className="Note_field"
          placeholder="Note something"
          rows="10"
          cols="130"
            minLength="15"
            required
        ></textarea>
<button type="submit" className='save_note'>Save note</button>
   </form>
        <ToastContainer />
  </div>
  )
}


export default Note_detail