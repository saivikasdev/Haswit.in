import React from 'react'
import './Profile_page.css'
import Profile_pic from '../../images/bitmoji.png';
import { UilPhone } from '@iconscout/react-unicons';
import { UilEnvelope } from '@iconscout/react-unicons';
import { UilWhatsapp } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilEdit } from '@iconscout/react-unicons'
import Top_row from './Top_row/Top_row';

import ReactWhatsapp from 'react-whatsapp';
import About_me from './About_me/About_me';
import Student_current from './Student_current/Student_current';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Profile_pictures from '../../Profile_pictures';
const Profile_page = (currentUser) => {
  const cookies = new Cookies();
  
  const navigate = useNavigate();
  return (
    <div className="Profile_page">
        <div className="Profile_title" onClick={()=>{
          console.log(Math.floor(Math.random() * (5 - 1 + 1)) + 1)
        }}> 
          Profile page
          <div onClick={()=>{
            navigate('/Complete_details')

          }}>
          <UilEdit/>
          </div>

        </div>
        <div className="Profile_body">
          <Top_row/>
          <Student_current/>
          <About_me/>
           <Link to="/Signup">
          <div className="logout_button" onClick={()=>{

         cookies.set('user', '', { path: '/' })
         console.log(cookies.get('user'))
        }}>
            Log Out
          </div>

          </Link>


        </div>
    </div>
  )
}

export default Profile_page