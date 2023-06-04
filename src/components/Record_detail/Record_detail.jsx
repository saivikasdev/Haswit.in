import React, { useEffect, useState } from "react";
import "./Record_detail.css";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import { db } from "../../firebase-config";
import Code_editor from "./Code_editor/Code_editor";
import LiveCodeEditor from "./Code_editor/Code_editor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import Loader from "../Loader";
const Record_detail = () => {

const [Session_Students, setSession_Students] = useState([]);

const [Test, setTest] = useState();
const [loading, setloading] = useState()
useEffect(() => {



  const fetchData = async () => {
setloading(true)
    const docRef = doc(db, cookies.get("session_month").toString(), cookies.get("session_date").toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setSession_file(docSnap.data().session_file);
      setSession_date(docSnap.data().date);
      setSession_name(docSnap.data().session_name);
      setSession_Students(docSnap.data().Students);
      setTest(docSnap.data().test);


      setloading(false)
      console.log(docSnap.data().Students);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

fetchData();
console.log(Session_Students);
}, [])


  const [code, setcode] = useState(true);
  const [note, setnote] = useState("");
  const [note_title, setnote_title] = useState("");
  const cookies = new Cookies();
  const note_set = (e) => {
    let note = e.target.value;
    setnote(note);
  };
  const date = new Date();
  const showTime =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  const Add_note = async (e) => {
    
setloading(true)
    e.preventDefault();
    if (note.length > 15) {
      await setDoc(
        doc(
          db,
          "Students",
          cookies.get("user").phoneNumber,
          "Notes",
          note_title
        ),
        {
          Note: note,
          time: showTime,
          session: Session_name,
          Note_title: note_title,
        },
        { merge: true }
      ).then(() => {
        toast('Note added successfully', {
    position: toast.POSITION.BOTTOM_LEFT,
    className: 'toast-message'
})
      });
    } else {
toast('Something went wrong', {
    position: toast.POSITION.BOTTOM_LEFT,
    className: 'toast-message'
})
    }
    
setloading(false)
  };


  const [Session_date, setSession_date] = useState();
  const [Session_file, setSession_file] = useState("");
  const [Session_name, setSession_name] = useState("");



  return (
    <div className="Record_detail">
      <div className="left_video">
        <div className="Record_detail_title">{Session_name ? Session_name : "Something went wrong"} - {Session_date ? "Session "+Session_date+"" : ""}</div>
        <div className="record_player">
          <iframe
            className="video_player"
            src={
              Session_file
                ? Session_file + "/preview"
                : "https://drive.google.com/file/d/1Albs2y1M5epcPVLcN4ib8KwpjP-1AzLd/preview"
            }
            allow="autoplay"
          ></iframe>

Coming back without test attempting will add 0 Skill stars So first prepare and go to test !

{(() => {
 
if(Session_Students){
  if (Session_Students.length>0) {
    if (Session_Students.includes(cookies.get("user").phoneNumber)) {
      return (
            <div className="go_to_test">Test completed already</div>
      )
    } else {
  
  if(Test){
    return(
     
      <Link to='/test'>
      <div className="go_to_test">GO to test</div>
      </Link>
   
      )
  }
  
  else{
    return(
    <div className="go_to_test">Test is not uploaded yet come later</div>
    )
  }
    }
  
  
  }
  else{
   if(Test){
    return(
     
      <Link to='/test'>
      <div className="go_to_test">GO to test</div>
      </Link>
   
      )
  }
  
  else{
    
    return(
    <div className="go_to_test">Test is not uploaded yet come later</div>
    )
  
  }
  }
}
else{
  if(Test){
    return(
      <Link to='/test'>
      <div className="go_to_test">GO to test</div>
      </Link>
   
      )
  }
  
  else{
    return(
    <div className="go_to_test">Test is not uploaded yet come later</div>
    )
  }
}



})()}







        </div>
      </div>
      <div className="right_blocks">
        <div className="buttons">
          <button
            type="submit"
            className={code ?"basic_button Selected":"basic_button"}
            onClick={() => {
              setcode(true);
            }}
          >
            Code
          </button>
          <button
            type="submit"
            className={code ?"basic_button":"basic_button Selected"}
            onClick={() => {
              setcode(false);
            }}
          >
            Note
          </button>
        </div>
        {code === false ? (
          <>
            <form onSubmit={Add_note} className="note_form">
              <textarea
                onChange={note_set}
                type="text"
                className="Note_field_"
                placeholder="Note something"
                rows="10"
                cols="130"
              minLength="15"
              required
              ></textarea>
              <input
                type="text"
                className="note_title"
                placeholder="Note title"
              minLength="5"
              maxLength="15"
              required
                onChange={(e) => {
                  setnote_title(e.target.value);
                }}
              />

              <button type="submit" className="runcode">
                Add note
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="live_compiler">
              <LiveCodeEditor />
            </div>
          </>
        )}
      </div>
      
      <ToastContainer />
      {
      (loading)?
      <Loader/>:null}
    </div>
  );
};

export default Record_detail;
