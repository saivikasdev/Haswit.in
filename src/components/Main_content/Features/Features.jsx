import React from 'react'
import './Features.css'
import { Link } from 'react-router-dom'
export const Features = () => {
  return (
   <div className="Features">
      <div className="Features_title">
         EXPLORE OUR FEATURES
      </div>
      <div className="Row__">
         <div className="Feature_">
            <div className="Feature_image">
            🗓️
            </div>
            <div className="Feature_title">
               Track your schedule
            </div>
            <div className="Feature_desc">
               Keep checking how much you covered and completed to earn skill stars.
            </div>
            <Link to='/My_journey'>
            <div className="Feature_button">
             Go to Calendar Page
            </div>
            </Link>
         </div>
         <div className="Feature_">
            <div className="Feature_image">
               💻
            </div>
            <div className="Feature_title">
               Complete Projects
            </div>
            <div className="Feature_desc">
               Complete projects to gain more skill stars.
            </div>
            <Link to='/Projects'>
            <div className="Feature_button">
             Go to Projects Page
            </div>
            </Link>
         </div>
         <div className="Feature_">
            <div className="Feature_image">
            🧑‍💻
            </div>
            <div className="Feature_title">
               Use Live Code editor
            </div>
            <div className="Feature_desc">
               Code editor plays a crucial role in practicing code.
            </div>
            <Link to='/Live_compiler'>
            <div className="Feature_button">
             Go to Code Editor Page
            </div>
            </Link>
         </div>
         
      </div>
      <div className="Row__">
         <div className="Feature_">
            <div className="Feature_image">
               🤔
            </div>
            <div className="Feature_title">
               Ask doughts
            </div>
            <div className="Feature_desc">
               Post doughts that can be solved by other students or by mentors.
            </div>
            <Link to='/Doughts'>
            <div className="Feature_button">
             Go to Doughts Page
            </div>
            </Link>
         </div>
         <div className="Feature_">
            <div className="Feature_image">
               🧑‍💼
            </div>
            <div className="Feature_title">
               Get job
            </div>
            <div className="Feature_desc">
               Jobs will be posted once the course came into flow .So earn skill stars.
            </div>
            <Link to='/Jobs'>
            <div className="Feature_button">
             Go to Jobs Page
            </div>
            </Link>
         </div>
         </div>
   </div>
  )
}
