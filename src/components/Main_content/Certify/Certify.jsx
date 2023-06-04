import React from 'react'
import './Certify.css'

import certificate from '../../../images/certificate.jpg';
export const Certify = () => {
  return (
   <div className="Certify">
      <div className="certificate_img">
      <img src={certificate} alt="" className='certificate_image'/>
      </div>
      <div className="Column">
      <div className="Certificate_title">
     CERTIFICATE OF APPRECIATION
      </div>
      <div className="Certificate_desc">
      Certification will be done for every student. Who will be provided with a digital certificate by haswit that he/she had completed a particular course in haswit after the completion of course.It can be used that to show you had passed the course.   </div>
      </div>
   </div>
  )
}
