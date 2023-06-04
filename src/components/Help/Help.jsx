import React from 'react'
import './Help.css'
import Contact_us_pic from '../../images/illustration.png';

import { useState } from 'react'
import { collection, query,onSnapshot } from "firebase/firestore";
import { useEffect } from 'react';
import { db } from '../../firebase-config';

import copy from "copy-to-clipboard";  
const Help = () => {
  const [loading, setLoading] = useState(false)
  const [mentors, setmentors] = React.useState([]);

  const fetchData = async () => {
    setLoading(true);
    const q = query(collection(db, "Helpline"),);
    onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setmentors([...res]);
       setLoading(false);
    });
  }

  useEffect(() => {
      fetchData()
  }, [])



  return (
    <div className="Help">
    <div className="Help_title">
        Help
    </div>
    <div className="Help_body">
    <div className="Help_text">
      Haswit serves 24/7 Helpline for All our Students doughts hear are our top mentors phone numbers who are ready to clarify your doughts at anytime 
    </div>
    <div className="Help_content">
    <div className="left_contact">
    {mentors.length > 0 && mentors.map((mentor,index) => (

<div className="Help_card">
        <div className="Mentor_name">
          {mentor.Mentorname}
        </div>
        <div className="Mentor_phone">
        {mentor.Mentorphone}
        </div>
        <div className="Dought_button" onClick={()=>{
          
    copy(mentor.Mentorphone);
          alert('Copied '+mentor.Mentorname+' Phone number')
        }}>
          Ask a Dought
        </div>
      </div>
))}

      
    



      </div>
      <div className="right_img">
        
      <img src={Contact_us_pic} alt="" className='Contact_us_pic'/>
      </div>
    </div>
    </div>

    </div>
  )
}

export default Help