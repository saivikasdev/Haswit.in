import React from "react";
import { useState } from "react";
import "./My_notes.css";
import My_note_card from "./My_note_card/My_note_card";
import Cookies from 'universal-cookie';
import { collection,query,onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect } from "react";
import Loader from "../Loader";
const My_notes = () => {
  const [Notes, setNotes] = useState([])
  const [Loading, setLoading] = useState(false)
  const cookies = new Cookies();
  const fetchNotes = async () => {


    setLoading(true);
    const q = query(collection(db, 'Students', cookies.get('user').phoneNumber,'Notes'),);
    onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setNotes([...res]);
       setLoading(false);
    });
  }

  useEffect(() => {
      fetchNotes()
  }, [])

  return (
    <div className="My_notes">
      <div className="My_notes_title">
      My notes
      </div>
     <div className="My_notes_grid">
     {Notes.length > 0 && Notes.map((Note,index) => (

<My_note_card Note={Note} key={index}/>
))}
     </div>
     {
      (Loading)?
      <Loader/>:null}
    </div>
  );
};

export default My_notes;
