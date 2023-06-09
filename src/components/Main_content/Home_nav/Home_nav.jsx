import React, { useEffect } from 'react'
import './Home_nav.css'
import { UilBell   } from '@iconscout/react-unicons';
import { UisFavorite } from '@iconscout/react-unicons-solid';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UilTimes } from '@iconscout/react-unicons'
import { db } from '../../../firebase-config';
import Cookies from 'universal-cookie';
import { collection ,query,onSnapshot, setDoc,doc, where,getDoc ,deleteDoc, updateDoc} from 'firebase/firestore';
function Home_nav() {



  const cookies = new Cookies();


  
  const [notifications, setnotifications] = useState([]);

  const [profile_pic, setprofile_pic] = useState('')

const [Old_notifications, setOld_notifications] = useState([]);
  const [points, setpoints] = useState()
  const fetchprofile_pic = async () => {
    const docRef = doc(db, "Students", cookies.get('user').phoneNumber);
    const docSnap = await getDoc(docRef);
    // console.log("Document data:", docSnap.data().profile_pic);
    if (docSnap.exists()) {
      setprofile_pic(docSnap.data().profile_pic)
      setpoints(docSnap.data().Points)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }



  const fetchData = async () => {
    const q = query(collection(db, "Notifications"),);
    onSnapshot(q, (querySnapshot) => {
      const notifications = [];
      querySnapshot.forEach((doc) => {
        notifications.push(doc.data());
      });
      setnotifications([...notifications]);
    });
  
  };


  const fetchNotifications = async () => {
    const docRef = doc(db, "Students", cookies.get('user').phoneNumber);
    const docSnap = await getDoc(docRef);
    // console.log("Document data:", docSnap.data().profile_pic);
    if (docSnap.exists()) {
      setOld_notifications(docSnap.data().Notifications)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const fetchNote = async () => {

    const docRef = doc(db, "Note_text", "Note_text");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      document.getElementById("front_content").innerHTML = docSnap.data().note_text;
    } else {

    }
    
  
  };

  useEffect(() => {
    fetchData();
    fetchNote();
    fetchNotifications();
  }, []);




  fetchprofile_pic();

  const [notifications_container, setnotifications_container] = useState(false)
  return (
    <div className="Home_nav">
        

<div className="front_content" id="front_content">
    Hey Sai !! <span>How's the day?? Make sure to </span>Check if Reminder is set for todays session..
</div>
     
        <div className="end_content">
            <Link to= '/Skill_Stars'>
            <div className="skill_stars">
            <div className="star">
                <UisFavorite color="#bdbdbd"/>

            </div>
            <div className="count">{points}</div>
        </div>
            </Link>
   <div className="notifications" onClick={async () => {
    setnotifications_container(!notifications_container)
    await updateDoc(
      doc(db, 
        "Students", cookies.get('user').phoneNumber),
      {
        Notifications:notifications.length
      },
      { merge: true }
    ).then(async () => {
    });
  
  }}>
   <Badge badgeContent={(Old_notifications)?Number(notifications.length)- Old_notifications:Number(notifications.length)} color="primary">
   <UilBell color="#bdbdbd" />
   </Badge>
   </div>
        <Link to= '/Profile_page  '>
        <div className="profile_pic_cont_nav">
        <img src= {profile_pic} className="profile_image_nav"/>
      </div>
        </Link>
        </div>
        {notifications_container === true ? (
        <>
        <div className="notification_container">
          <div className="notifications_heading">
            Notifications
            <div className="close">
            <UilTimes onClick={
              async () => {setnotifications_container(!notifications_container)
               



              
              
              
              }
            }/>
            </div>
          </div>

          {notifications.length > 0 &&
        notifications.map((notification, index) => (
        
        
        
        <div className="Notification" key={index}>
        {notification.notification}
      </div>
        ))}


          </div>
          </>):(null)}


          </div>

  )
}

export default Home_nav