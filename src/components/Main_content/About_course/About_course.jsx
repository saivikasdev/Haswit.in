import React from 'react'
import './About_course.css'

import react from '../../../images/full_stack.png';
export const About_course = () => {
  return (
   <div className="About_course">
      <div className="About_course_head">
      ABOUT FULL STACK
      
     
     <img src={react} alt="" width="90px" className='react_logo'/>
      </div>
      <div className="About_course_desc">
      Full stack development refers to the practice of working on both the front-end and back-end aspects of a software application or website. A full stack developer is someone who is proficient in multiple layers of the technology stack, including the client-side (front-end), server-side (back-end), and sometimes even the infrastructure and deployment aspects.
      .Full stack developer may also do 1.Front-End Development 2.Back-End Development 3.Databases 4.API Development 5.DevOps and Deploymentfull stack development encompasses a wide range of skills and technologies. Full stack developers have the ability to work on multiple layers of an application, from the user interface to the server-side logic and data management. They have a holistic understanding of the development process and can build end-to-end solutions independently or as part of a team.
     </div>
   </div>
  )
}
