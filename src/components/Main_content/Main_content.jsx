import './Main_content.css'
import { Best_mentors } from './Best_mentors/Best_mentors'
import React from 'react'
import Home_nav from './Home_nav/Home_nav'
import Home_body from './Home_body/Home_body'
import { UilPhone } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import { Procedure } from './Procedure/Procedure'
import { Talk_to_us } from './Talk_to_us/Talk_to_us'
import { About_course } from './About_course/About_course'
import { Features } from './Features/Features'
import { Certify } from './Certify/Certify'
import { Adv } from './Adv/Adv'

function Main_content() {
  return (
   <div className="Main_content">
     <div className="Home">
     <Home_nav/>
     <Home_body/>
     <Best_mentors/>
     <Procedure/>
     <div className="Row">
      
     <Talk_to_us/>
     <About_course/>
     </div>
     
     <Features/>
     <Certify/>
     <Adv/>
     <Link to='/Help'>
     <div className="FA_B">



      
        <UilPhone/>
      </div>
     </Link>
     
     </div>
   </div>
  )
}

export default Main_content