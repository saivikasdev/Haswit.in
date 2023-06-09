import React from 'react'
import './Best_mentors.css'

import Mentor1 from '../../../images/Mentor1.jpg';
import Mentor2 from '../../../images/mentor2.jpg';
import Mentor3 from '../../../images/mentor 3.jpg';
export const Best_mentors = () => {
  return (
    <div className="Best_mentors">
      <div className="Best_mentors_heading">
        <div className="Our">
          OUR
        </div>
        <div className="Best_m">
          Best Mentors
        </div>
      </div>
      <div className="Mentor_pics">
        <div className="Mentor_">

        
      <img src={Mentor1} alt="Mentor" className="Mentor_pic"/>
          <div className="Mentor_name_">Muzafer</div>
          <div className="Work_">CEO</div>
      </div>
      <div className="Mentor_">

        
<img src={Mentor2} alt="Mentor" className="Mentor_pic"/>
    <div className="Mentor_name_">Vikas</div>
    <div className="Work_">Manager</div>
</div> <div className="Mentor_">

        
<img src={Mentor3} alt="Mentor" className="Mentor_pic"/>
    <div className="Mentor_name_">Varun</div>
    <div className="Work_">Mentor</div>
</div>
      </div>
    </div>
  )
}
