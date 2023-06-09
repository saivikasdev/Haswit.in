import React from "react";
import { useState } from "react";
import "./Signup.css";
import { authentication } from "../../firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, Timestamp ,getDoc} from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import { redirect } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { getAuth, updateProfile } from "firebase/auth";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from "copy-to-clipboard";  
import Loader from "../Loader";
const Signup = () => {
  const cookies = new Cookies();
  const [otp_block, setotp_block] = useState(false);
  const [Phone, setPhone] = useState("+91");
  const [OTP, setOTP] = useState("");

  const [loading, setLoading] = useState(false);
  window.name = Phone;
  const Recaptcha = (e) => {
    
    setLoading(true);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "Recaptcha",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
    
    setLoading(false);
  };

  
  const navigate = useNavigate();
  async function handleClick() {
    const docRef = doc(db, "Students",Phone );
    const docSnap = await getDoc(docRef);
if(docSnap.exists()){
  console.log(doc)
  
  navigate("/");
}
else{
  console.log('//////////')
  
  navigate("/Complete_details");
}
  }

  const verifyotp = async (e) => {
    setLoading(true)

    e.preventDefault();
    let Otp = e.target.value;
    setOTP(Otp);

    const docRef = doc(db, "Students",Phone );
    const docSnap = await getDoc(docRef);
    if (e.target.value.length === 6) {
      
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
            
            toast('Already had an account login..', {
              position: toast.POSITION.BOTTOM_LEFT,
              className: 'toast-message'
          });

            // console.log(doc)
            // console.log(authentication.currentUser.phoneNumber)
            // navigate("/");
            
          }
          else{
            
            console.log(result)
            console.log(result.user)
            authentication.currentUser.phoneNumber=result.user.phoneNumber

            // await setDoc(doc(db, "All_users", Phone), {
            //   Phone: Phone,
            //   payment:false,
            // }).then(()=>{
              cookies.set('user', result.user, { path: '/' })
              
            navigate("/payment");

            // });



            
          }

          
          // console.log(result.user.me)
          // console.log(result.user)
          // handleClick()
            

        })
        .catch((error) => {
          console.log(error);
          toast(error.toString(), {
            position: toast.POSITION.BOTTOM_LEFT,
            className: 'toast-message'
        });
        });
        
    }
    setLoading(false)
  };

  const requestOTP = (e) => {
    setLoading(true)
    e.preventDefault();
    if (Phone.length >= 12) {
      
      Recaptcha();
      let appverifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, Phone, appverifier)
        .then((conformationResult) => {
          window.conformationResult = conformationResult;

          toast('OTP sent', {
            position: toast.POSITION.BOTTOM_LEFT,
            className: 'toast-message'
        });
    setotp_block(true);
        })
        .catch((error) => {
          console.log(error);
          toast(error.toString()+"try again later after refresh", {
            position: toast.POSITION.BOTTOM_LEFT,
            className: 'toast-message'
        });
        });
        
    }
    
    setLoading(false);
  };

  const set_phone = (e) => {
    let phone = e.target.value;
    setPhone(phone);
  };

  return (
    <div className="Signup">
      <div className="">
        <form onSubmit={requestOTP} className='Phone_otp_block'>
          
        Signup
        <div className="Phone_text">Enter Phone Number with country code</div>
          <input
            type="tel"
            className="Phone_input"
            placeholder="Enter Your Phone number"
            onChange={set_phone}
            maxLength="13"
            minLength="11"
            required
          />
          <button type="submit" className="send_otp">
            Send OTP
          </button>
          {otp_block === true ? (
          <>
            <div className="OTP_fieldd">
              <input
                type="telephone"
                className="OTP_input_"
                placeholder="6 digit OTP"
                onChange={verifyotp}
                maxLength="6"
                minLength="6"
                required

              />
            </div>
          </>
        ) : null}
        </form>
       
      </div>
        <ToastContainer />
      <div id="Recaptcha"></div>
      {
      (loading)?
      <Loader/>:null}
    </div>
    
    
  );
};

export default Signup;
