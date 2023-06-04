import React from 'react'
import './Top_row.css'
// import Profile_pic from '../../../images/bitmoji.png';
import { UilPhone } from '@iconscout/react-unicons';
import { UilEnvelope } from '@iconscout/react-unicons';
import { UilWhatsapp } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { useEffect } from 'react';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../../../firebase-config';
import { collection ,query, onSnapshot ,doc,getDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import Cookies from 'universal-cookie';
import Loader from '../../Loader';
const Top_row = () => {
  
  const cookies = new Cookies();
  const [currentuser, setcurrentuser] = useState(false)
const [Loading, setLoading] = useState(false)
const [user_name, setuser_name] = useState('')
const [UID, setUID] = useState('')
const [college, setcollege] = useState('')
const [gmail, setgmail] = useState('')
const [whatsapp, setwhatsapp] = useState('')
const [address, setaddress] = useState('')
const [profile_pic, setprofile_pic] = useState('')
  const fetchDetails = async () => {
    setLoading(true)

    const docRef = doc(db, "Students", cookies.get('user').phoneNumber);
    const docSnap = await getDoc(docRef);
    
    console.log("Document data:", docSnap.data().Name);
    if (docSnap.exists()) {
      setuser_name(docSnap.data().Name)
      setUID(docSnap.data().UID)
      setcollege(docSnap.data().study_at)
      setprofile_pic(docSnap.data().profile_pic)

      setgmail(docSnap.data().gmail)
      setwhatsapp(docSnap.data().Whatsapp)
      setaddress(docSnap.data().address)
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    
    console.log("No such document!");
    setLoading(false)
  };


  useEffect(() => {
    onAuthStateChanged(authentication,(user)=>{
      setcurrentuser(user.phoneNumber)
    });


    fetchDetails();


  }, [])
  
  
  return (
    <div className="Top_row">
        <div className="top_row">
          <div className="top_left_div">
          <div className="top_profile_div">
            <img src= {profile_pic} className="profile_pic"/>
          <div className="top_profile_right_div">
            <div className="Profile_name">
              {user_name}

            </div>
            <div className="UID">
              UID : {UID}
            </div>
            <div className="work">
            Works at {college}
          </div>
          </div>
          
          </div>
          </div>
          <div className="top_right_div">
            <div className="phone_number" >
            <div className="phone_number_icon">
                <UilPhone size="30px"/>
                </div>
              
              {cookies.get('user').phoneNumber}
            </div>
            <div className="whatsapp_number">
              <div className="whatsapp_number_icon">
                <UilWhatsapp size="30px"/>

              </div>
              {whatsapp}
            </div>
            <div className="address">
            <div className="address_icon">
                <UilLocationPoint size="30px"/>
                </div>
                {address}
            </div>

          </div>
          </div>
          {
      (Loading)?
      <Loader/>:null}
    </div>
  )
}

export default Top_row