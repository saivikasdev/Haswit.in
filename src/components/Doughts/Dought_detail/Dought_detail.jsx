import React, { useEffect, useState } from 'react'
import './Dought_detail.css'

import Profile_pic from '../../../images/bitmoji.png';
import Cookies from "universal-cookie";
import { doc, setDoc,getDoc ,collection,query,onSnapshot,} from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader';
const Dought_detail = () => {
    
  const cookies = new Cookies();
    const [answer_form, setanswer_form] = useState(false)
    const [answer, setanswer] = useState('')
const [Loading, setLoading] = useState(false)
const [answers, setanswers] = useState([])
const [doughter, setdoughter] = useState('')
const [doughter_pic, setdoughter_pic] = useState('')
const fetchdoughter = async () => {
    

  const docRef = doc(db, "Doughts", cookies.get('dought'));
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    setdoughter(docSnap.data().Username)
    setdoughter_pic(docSnap.data().profile_pic)
    
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  
  console.log("No such document!");

};


const fetch_profile_pic = async () => {

}


    const fetchAnswers = async () => {


      setLoading(true);
      const q = query(collection(db, "Doughts", cookies.get('dought'),'answers'),);
      onSnapshot(q, (querySnapshot) => {
        const res = [];
        querySnapshot.forEach((doc) => {
          res.push(doc.data());
        });
        setanswers([...res]);
         setLoading(false);
      });
    }
  
    useEffect(() => {
        fetchAnswers()
    }, [])
  

    fetchdoughter();
    fetch_profile_pic();

    const add_answer = async (e) => {
      
        e.preventDefault();
        const docRef = doc(db, "Students",cookies.get('user').phoneNumber);
      const docSnap = await getDoc(docRef);
        if (answer.length>6) {
          console.log(docSnap.data().Name)
          await setDoc(doc(db, "Doughts", cookies.get('dought'),'answers',answer), {
            Answer:answer,
            User: docSnap.data().Name,
            profile_pic :docSnap.data().profile_pic,
    
          },{ merge: true }).then(() => {
            setanswer_form(!answer_form)

            toast('Answer posted successfully', {
              position: toast.POSITION.BOTTOM_LEFT,
              className: 'toast-message'
          })
    
          })
            
    
    }
    else{
    }
      }

  return (
    <div className="Dought_detail">
        <div className="Dought_detail_title">
        <div className="dought_title_container">
        <div className="dought_title_row">
          <div className="dought">
        {cookies.get('dought')
        }</div>
        <div className="no_of_answers">
            {answers.length} Answers
        </div>
        </div>
        <div className="solve_button" onClick={()=>{
          setanswer_form(!answer_form)
        }}>
        Solve the Dought
        </div>
        </div>

        <div className="Doughted_student_">
            <div className="Doughted_student_pic">
            <img src= {doughter_pic} className="profile_image__"/>
            </div>
            <div className="Doughted_student_name">
                {doughter}
            </div>
        </div>
        </div>
        {answer_form === true ? (
      <>
        <form onSubmit={add_answer} className="add_dought_form">
          <textarea
            onChange={(e)=>{
                setanswer(e.target.value)
            }}
            type="text"
            className="project_details"
            placeholder="Your answer (Should not contain '/')"
            rows="10"
            cols="130"
            minLength="15"
            required
          ></textarea>
            

            <button type="submit" className="post_dought_button">
              Post
            </button>
        </form>
      </>
    ) : null}
       <div className="Answers_">
       {answers.length > 0 && answers.map((answer,index) => (
        <div className="Answer_tile">
            <div className="answer">
            {answer.Answer}
            </div>
            <div className="Answered_student_">
            <div className="Doughted_student_pic">
            <img src= {answer.profile_pic} className="profile_image__"/>
            </div>
            <div className="Doughted_student_name">
            {answer.User}
            </div>
        </div>
        </div>
))}
       </div>
        <ToastContainer />
        {
      (Loading)?
      <Loader/>:null}
    </div>
  )
}

export default Dought_detail