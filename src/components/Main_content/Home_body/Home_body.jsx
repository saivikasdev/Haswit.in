import React, { useEffect, useState } from "react";
import "./Home_body.css";
import whatsAppClient from "@green-api/whatsapp-api-client";
import { UilPlayCircle } from "@iconscout/react-unicons";
import Left_mini_calender from "./Left_mini_calender/Left_mini_calender";
import Right_blocks from "./Right_blocks/Right_blocks";
import moment from 'moment/moment';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

import { db } from '../../../firebase-config';
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import { ToastContainer, toast } from "react-toastify";
function Home_body() {
  const currentDate = new Date();
  const currentDay_ = currentDate.getDate();
const [month, setmonth] = useState(currentDate.getMonth());
  
const [Loading, setLoading] = useState();
  const [dateObject, setdateObject] = useState(moment());
  const [live, setlive] = useState(false);
  const [class_at, setclass_at] = useState(null);
const [link, setlink] = useState('no link found')
const [session_name, setsession_name] = useState('')


const [Current_file, setCurrent_file] = useState();
const [Current_test, setCurrent_test] = useState();
const [Current_students, setCurrent_students] = useState([]);



const cookies = new Cookies();
  const fetchData = async () => {
    setLoading(true);

    const docRef = doc(db,
      month.toString(),
      currentDay_.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setlink(docSnap.data().link)
      setclass_at(docSnap.data().time)
      setsession_name(docSnap.data().session_name)
      
  
      
     // console.log("Document data:", docSnap.data());
      
      if (class_at) {
      fetchLocalTimes();
    }
    else{
      fetchLocalTimes();
    }
    

    setLoading(false);
  };
}
  const [localTimes, setLocalTimes] = useState([]);
  useEffect(() => {
    

    const fetch_current = async () =>{
      
    setLoading(true);
      const docRef = doc(db, currentDate.getMonth().toString(), currentDate.getDate().toString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    
    setCurrent_file(docSnap.data().file);
    setCurrent_test(docSnap.data().test);
    setCurrent_students(docSnap.data().Students);


  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");}
    setLoading(false)
  }

  fetch_current()

    fetchData();


     
  onSnapshot(
    doc(db, 
      month.toString(),
      currentDay_.toString()), 
    (doc) => {
      console.log(doc.data().live)
      setlive(doc.data().live)
    });




  }, []);


  const fetchLocalTimes = async () => {
    const countries = [
      { name: 'United States', timezone: 'America/New_York' },
{ name: 'United Kingdom', timezone: 'Europe/London' },
{ name: 'Australia', timezone: 'Australia/Sydney' },
{ name: 'Canada', timezone: 'America/Toronto' },
{ name: 'Germany', timezone: 'Europe/Berlin' },
{ name: 'China', timezone: 'Asia/Shanghai' },
{ name: 'India', timezone: 'Asia/Kolkata' },
{ name: 'Japan', timezone: 'Asia/Tokyo' },
{ name: 'Brazil', timezone: 'America/Sao_Paulo' },
{ name: 'France', timezone: 'Europe/Paris' },
{ name: 'Russia', timezone: 'Europe/Moscow' },
{ name: 'Mexico', timezone: 'America/Mexico_City' },
{ name: 'South Africa', timezone: 'Africa/Johannesburg' },
{ name: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
{ name: 'Italy', timezone: 'Europe/Rome' },
{ name: 'Spain', timezone: 'Europe/Madrid' },
{ name: 'South Korea', timezone: 'Asia/Seoul' },
{ name: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
{ name: 'Netherlands', timezone: 'Europe/Amsterdam' },
{ name: 'Turkey', timezone: 'Europe/Istanbul' },
{ name: 'New Zealand', timezone: 'Pacific/Auckland' },
{ name: 'Sweden', timezone: 'Europe/Stockholm' },
{ name: 'Switzerland', timezone: 'Europe/Zurich' },
{ name: 'Norway', timezone: 'Europe/Oslo' },
{ name: 'Greece', timezone: 'Europe/Athens' },
{ name: 'Portugal', timezone: 'Europe/Lisbon' },
{ name: 'Egypt', timezone: 'Africa/Cairo' },
{ name: 'Thailand', timezone: 'Asia/Bangkok' },
{ name: 'Indonesia', timezone: 'Asia/Jakarta' },
{ name: 'Malaysia', timezone: 'Asia/Kuala_Lumpur' },
      // Add more countries and their respective timezones here
    ];

    const localTimes = [];

    const currentTime = new Date();
    (class_at)?currentTime.setHours(class_at, 0, 0):currentTime.setHours(21, 0, 0) // Set the time to 21:00

    for (const country of countries) {
      const localTimeString = currentTime.toLocaleTimeString(undefined, {
        timeZone: country.timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });

      localTimes.push({
        country: country.name,
        time: localTimeString,
      });
    }

    setLocalTimes(localTimes);
  };





  return (
    <div className="Home_body">
      <div className="live_banner" onClick={() => { 
        

        
        window.location.href = link;
         }}>
        <div className="up_texts">
          <div className="_rem_date">
            
          <div className="join_now">{live ? "join now" : "Set remainder"}</div>
          <div className="date__">
          {currentDay_}
        -{month.toString()}-2023
          </div>
          </div>
          <div className="large_text">
            {live
              ? <div className="session_started">
              Live session Started please join...
              </div>
              : 
              
              (session_name==="holiday")?
              <>There's no class today !! Meet tommorow..</>
              :
              
              <>Session is at today {class_at}:00 IST Set Reminder!</>}
          </div>
          <div className="to_go">
          {moment(class_at, "hh").fromNow()}

          </div>
        </div>
        <div className="small_text">
          <UilPlayCircle className ="Play_icon"/>
         {(session_name==="holiday")?
              'Check for projects..'
              : 'Session is on ' + session_name
              }
        </div>
      </div>
      <div className="Row___">
<div className="Time_coversion"> Today's Session at  
<select>
  
  {localTimes.map((localTime, index) => (
    <option key={index}>{localTime.country}: {localTime.time}</option>
  
))}
</select></div>

Be sure to join in whatsapp group for live reminders by your instructor
</div>
{(() => {
  if (Current_file===false||Current_test===false){
      return (
        null
      )
  }
else {
  if (Current_students > 0) {
    if (Current_students.includes(cookies.get("user").phoneNumber)) {
      return (
        null
      )
    } else {
      return(
      <div className="Test_pending">
      Session record and test are uploaded !! View the record and write the test..
      <div className="write_now_button" onClick={() => {
          console.log('clicked')
          cookies.set("session_date", currentDate.getDate(), { path: "/" });
          cookies.set("session_month", currentDate.getMonth(), { path: "/" });
        }}
      >

        
        <Link to={(Current_test&&Current_file) ? "/record_detail" : "/"}>
        Write Now
        </Link>
      </div>
    </div>)
    }
  
  
  }
  else {
    return(
    <div className="Test_pending">
    Session record and test are uploaded !! View the record and write the test..
    <div className="write_now_button" onClick={() => {
        console.log('clicked')
        cookies.set("session_date", currentDate.getDate(), { path: "/" });
        cookies.set("session_month", currentDate.getMonth(), { path: "/" });
      }}
    >
      <Link to={(Current_test&&Current_file) ? "/record_detail" : "/"}>
       
      Write Now
      </Link>
    </div>
  </div>)
  }

}
})()}


      <div className="Left_right_cont">
        <Left_mini_calender />
        <Right_blocks />
      </div>{
      (Loading)?
      <Loader/>:null}
      <ToastContainer/>
    </div>

  );
}

export default Home_body;
