
import React from 'react'
import { useState } from 'react'
import './Complete_details.css'
import { doc, Firestore, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { authentication, db } from "../../firebase-config";
import whatsAppClient from "@green-api/whatsapp-api-client";
import { useNavigate } from "react-router-dom";
import Profile_pictures from '../../Profile_pictures';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
const Complete_details = () => {
  
  const cookies = new Cookies();
  const [Name, setName] = useState('')
  const [Whatsapp, setWhatsapp] = useState()
  const [randomotp, setrandomotp] = useState(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000)
  const [study_at, setstudy_at] = useState('')
  const [final_wtsp_number, setfinal_wtsp_number] = useState('')
  const [address, setaddress] = useState('')
  const [button1, setbutton1] = useState('Send OTP')
  const [button2, setbutton2] = useState('Verify OTP')
  const [otp, setotp] = useState('')
  const [about, setabout] = useState('')
  const date = new Date();
    const showTime = date.getDate()+'/'+(date.getMonth()+1)+' '+date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();  


  const navigate = useNavigate();
  function handleClick() {
    navigate("/home");

    console.log('///////')
  }

  const send_otp = async () => {
  
  console.log(randomotp)
if(Whatsapp>10){
  const restAPI = whatsAppClient.restAPI({
    idInstance: "1101802079",
    apiTokenInstance: "2d3c82e709534641af6a970829ee7e2c9f248118cad546dbb7",
  });
  const response = await restAPI.message.sendMessage(
    "+919182783270",
    Whatsapp,
    '📌 OTP for your HASWIT is here: ' + randomotp
  );
  
  response.then(
    setbutton1('Sent'),
    toast('OTP sent Successfully', {
      position: toast.POSITION.BOTTOM_LEFT,
      className: 'toast-message'
  })

  )
  console.log(response)
}
else{
  toast('Something went wrong', {
    position: toast.POSITION.BOTTOM_LEFT,
    className: 'toast-message'
})
  console.log('enter number first')
 
}

    
  };







  const Setdata = async (e) => {
    e.preventDefault();
    console.log(Name)
    console.log(final_wtsp_number)
    console.log(study_at)
    console.log(address)

    const docRef = doc(db, "All_users",cookies.get('user').phoneNumber );
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
          await setDoc(doc(db, "Students", cookies.get('user').phoneNumber), {
           Phone:cookies.get('user').phoneNumber,
           Points:0,
           UID:authentication.currentUser.uid,
            Name:Name,
            Whatsapp:final_wtsp_number,  
            study_at:study_at,
            address:address,
            time:showTime,
            about:about,
            profile_pic:Profile_pictures[Math.floor(Math.random() * (Profile_pictures.length - 0 + 1)) + 0]
          },{ merge: true }).then(() => {
            handleClick()
            toast('You are successfully completed\n Welcome to HASWIT', {
              position: toast.POSITION.BOTTOM_LEFT,
              className: 'toast-message'
          });
  
          })
        }

      toast('Complete the payment first if done contact HASWIT', {
        position: toast.POSITION.BOTTOM_LEFT,
        className: 'toast-message'
    });
  }




  const set_name = (e) => {
    let name = e.target.value;
    setName(name);
  };
  const set_whatsapp = (e) => {
    let whatsapp = e.target.value;  
    setfinal_wtsp_number(whatsapp);
  };
  const set_otp = (e) => {
    let otp = e.target.value;
    setotp(otp);
  };
  const set_study_at = (e) => {
    let study_at = e.target.value;
    setstudy_at(study_at);
  };
  const set_address = (e) => {
    let address = e.target.value;
    setaddress(address);
  };
  const set_about = (e) => {
    let about = e.target.value;
    setabout(about);
  };
  return (
   <div className="Complete_details">
       <form onSubmit={Setdata} className='Details_block' >
          
          <div className="Details_head">Enter your details</div>
            <input
            onChange={set_name}
              type="text"
              className="Name"
              placeholder="Enter Your Name"
              maxLength="20"
              minLength="10"
              required
             
            />
            <input
            onChange={set_whatsapp}
              type="number"
              className="Whatsapp"
              placeholder="Valid Whatsapp no. to send class updates.."
              maxLength="13"
              minLength="10"
              required
            />
          <input
          onChange={set_study_at}
          type="text"
          className="Studies_at"
          placeholder="Studying at"
          maxLength="25"
          minLength="10"
          required
         
        />
        <input
            onChange={set_address}
          type="text"
          className="Address"
          placeholder="Enter Your Address"
          maxLength="30"
          minLength="20"
          required
         
        />
         <textarea
              onChange={set_about}
              type="text"
              className="project_details"
              placeholder="About me"
              rows="10"
              cols="130"
              maxLength="100"
              minLength="30"
              required
            ></textarea>
            <button type="submit" className="send_otp">
              Submit
            </button>
           Details cannot be changed !
          </form>
        <ToastContainer />
   </div>
  )
}

export default Complete_details