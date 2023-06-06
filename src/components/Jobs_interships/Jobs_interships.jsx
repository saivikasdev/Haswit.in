import React from 'react'
import './Jobs_interships.css'
import certificate from '../../images/certificate.jpg'
import jobs from '../../images/jobs.webp'
import xelpmoc from '../../images/xelpmoc.png'
import tata from '../../images/tata.png'
import tech_mahi from '../../images/tech_mahi.png'
export const Jobs_interships = () => {
  return (
   <div className="Jobs_interships">
      <div className="Jobs">
        
         <div className="Roww">

         <img src={jobs} alt="" className='Jobs_img'/>
            <div className="C">
            <div className="Jobs_head">
            10% Jobs & 20% Interships
         </div>
            <div className="Jobs_desc">
               Yeah its true HASWIT also provides jobs and internships by collaborating with companies. Telling them that we have highly trained 
               students and may 10% to 30% of the students may get hired. As the courses full stack web and app development
               are very high in demand. <strong>
                  Note: 
               </strong>
               No student gets hired without working hard they should properly trained.
           
            </div>
            
            </div>
         </div>
      </div>
      <div className="Certifyy">
         <div className="Certify_headd">
            Certification
         </div>
         <img src={certificate} alt="" className='certificatee'/>
            <div className="Certify_desc">
             Certification will be done for every student. Who will be provided with a digital certificate by haswit that he/she had completed a 
             particular course in haswit after the completion of course.It can be used that to show you had passed the course.</div>
      </div>
   </div>
  )
}
