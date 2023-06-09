import React, { useEffect } from "react";
import "./TID_join.css";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import copy from "copy-to-clipboard";  
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { authentication_ } from "../../TID_firebase-config";
import Cookies from 'universal-cookie';
import { db_ } from "../../TID_firebase-config";
import { doc, setDoc, Timestamp ,getDoc} from "firebase/firestore";
import { AiOutlineRight } from 'react-icons/fa';
import Loader from "../Loader";
export const TID_join = () => {
  const cookies = new Cookies();
  
  useEffect(() => {
    fetchLocalTimes()
  }, [])
  
  const [Phone, setPhone] = useState("+91");
  const [otp_block, setotp_block] = useState(false);
  const [Sent, setSent] = useState(false);
  const [OTP, setOTP] = useState("");
  
  const [localTimes, setLocalTimes] = useState([]);
  const set_phone = (e) => {
    let phone = e.target.value;
    setPhone(phone);
  };

  const Recaptcha = (e) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "Recaptcha",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication_
    );
  };


  const [loading, setLoading] = useState(false);

  const copyToClipboard = () => {
    copy('https://meet.google.com/wev-dmwr-mnv');
    alert(`You have copied "${'https://meet.google.com/wev-dmwr-mnv'}"`);
 }

  const requestOTP = async (e) => {
    console.log('working fine..')
    e.preventDefault();
    if (Phone.length >= 12) {
      
    setLoading(true);
      
    const docRef = doc(db_, "Tech_inno_drive",Phone );
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      console.log(doc)
      console.log(authentication_.currentUser.phoneNumber)
      await setDoc(doc(db_, "Tech_inno_drive", Phone), {
        Phone: Phone,
      called:false
      }).then(()=>{

        setSent(true);
        console.log('Otp verified succesfully')
      });
    }
    else{
      await setDoc(doc(db_, "Tech_inno_drive", Phone), {
        Phone: Phone,
        
      called:false      
      }).then(()=>{

        setSent(true);
        console.log('Otp verified succesfully')
      });

      


    }
    //   Recaptcha();
    //   let appverifier = window.recaptchaVerifier;
    //   signInWithPhoneNumber(authentication_, Phone, appverifier)
    //     .then((conformationResult) => {
    //       window.conformationResult = conformationResult;

    //       toast('OTP sent', {
    //         position: toast.POSITION.BOTTOM_LEFT,
    //         className: 'toast-message'
    //     });
    // setotp_block(true);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       toast('Something went wrong please try again!', {
    //         position: toast.POSITION.BOTTOM_LEFT,
    //         className: 'toast-message'
    //     });
    //     });
        
    setLoading(false);
        
    }
  };


  
  const verifyotp = async (e) => {

    e.preventDefault();
    let Otp = e.target.value;
    setOTP(Otp);

    const docRef = doc(db_, "Tech_inno_drive",Phone );
    const docSnap = await getDoc(docRef);
    if (e.target.value.length === 6) {
      
    setLoading(true);
      let conformationresult = window.conformationResult;
      conformationresult
        .confirm(e.target.value)
        .then(async (result) => {
          toast('OTP verified successfully', {
            position: toast.POSITION.BOTTOM_LEFT,
            className: 'toast-message'
        });
          // cookies.set('user', result.user, { path: '/' });
          if(docSnap.exists()){
            console.log(doc)
            console.log(authentication_.currentUser.phoneNumber)
            await setDoc(doc(db_, "Tech_inno_drive", Phone), {
              Phone: Phone,
            called:false
            }).then(()=>{

              setSent(true);
              console.log('Otp verified succesfully')
            });
          }
          else{
            console.log(result)
            console.log(result.user)
            authentication_.currentUser.phoneNumber=result.user.phoneNumber
            await setDoc(doc(db_, "Tech_inno_drive", Phone), {
              Phone: Phone,
              
            called:false      
            }).then(()=>{

              setSent(true);
              console.log('Otp verified succesfully')
            });

            


          }

          
          // console.log(result.user.me)
          // console.log(result.user)
          // handleClick
            

        })
        .catch((error) => {
          console.log(error);
        });
        
    setLoading(false);
    }
  };



  const navigate = useNavigate();

  const fetchLocalTimes = async () => {
    const countries = [
      { name: 'United States', timezone: 'America/New_York'},
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
    currentTime.setHours(20, 0, 0) // Set the time to 21:00

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
    <div className="TID_Page">

<div className="Login_Signup">
<button type="button" onClick={()=>{
  navigate('/Login')

}}>Login</button>
<button type="button" onClick={()=>{
  navigate('/Signup')

}}>Signup</button>

<button type="button" onClick={()=>{
  navigate('/home')

}}>Home</button>
</div>

      <div className="TID_join">
      <div className="Columnn">
        <div className="Haswits">HASWIT'S</div>
        <div className="TID_head">TECH INNOVATION DRIVE <i>-8:00PM Every day 
           <div className="Roww">
  Session at : 
<select className="Local_timess">
  
  {localTimes.map((localTime, index) => (
    <option key={index}>{localTime.country}: {localTime.time}</option>
   
))}
</select>


</div>
</i></div>
        <div className="TID_desc">
         Tech innovation drive is a<strong>  FREE </strong>one hour session on brief explanation of all software technologies leading now 
    that will be conducted every day at 8pm IST internationally where students are thought with many IT technologies like What is python java MongoDB CSS HTML Javascript ReactJS MYSQL Jobs Frontend backend database Internships Many more..
         </div>
        
      </div>
      
      <div className="Column_">
      <div className="Phonee">Give us your phone number to send google meet link or you can copy it</div>
      
        <div className="Roww_"> 
         
        <div className="Roww">
          {Sent === false ? 
          (
<>
        <form onSubmit={requestOTP} className='Phone_otp_blockk'>
          
         <div className="Roww">
            
            <input type="number" placeholder="Phone number (+91)" className="Phone_field"
            
            onChange={set_phone}
              maxLength="13"
              minLength="11" required/>
              
          <button className="Send_otp" type="submit">
           Notify me
          </button>
  
          
          {/* {otp_block === true ? (
            <>
  
                
            <input type="telephone" placeholder="OTP" className="OTP_field"
            
            onChange={verifyotp}
              maxLength="6"
              minLength="6"
              
              required
              />
            </>
          ) :null} */}
         </div>
          </form>
          </>)
          : (<>
          <div className="Phone_text">
            
            You will be notified
            Link will be sent..
          </div>
            </>)
          }
          
        </div>
        <div className="Meet_link" onClick={copyToClipboard}>
        https://meet.google.com/wev-dmwr-mnv
        <div className="Copy">
         🔗
        </div>
        </div>

        </div>
      </div>
      
      <div id="Recaptcha"></div>
    </div>
    
    {
      (loading)?
      <Loader/>:null}
    </div>
  );
};
