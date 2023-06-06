import React from 'react'
import './Talk_to_us.css'
export const Talk_to_us = () => {
  return (
   <div className="Roww___">

   <div className="Talk_to_uss">
      <div className="Lets_talk">
      Let's Talk.
      </div>
      <div className="Contact_us">
         Contact US
         
      <div className="Lets_talk_aboutt" style={{ color: '#7b00ff' }}>+919182783270</div>
      </div>
      <div className="Lets_talk_aboutt">
         Lets talk about

      </div>
      <div className="Contact_items">
         <div>What technologies we ill teach?<br/></div>
         <div>
         Are you good for IT background?<br/>
         </div>
         <div>
            
         DO you need laptop for this?<br/>
         </div>
         <div>
            
         Many more..<br/>
         </div>
      </div>
   </div>
   <div className="Join_for_more">
   <div className="Join_TID">
      
   <div className="Haswits">HASWIT'S</div>
        <div className="TID_headd_">TECH INNOVATION DRIVE <i>- at today 08:00 PM</i></div>
        <div className="Register_now" onClick={()=> {
          window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}}>
         Register now
        </div>
   </div>
   </div>
   </div>
  )
}
