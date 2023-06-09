import React from 'react'
import './Job_card.css'
const Job_card = (props) => {
  const { Job } = props;
  return (
    <div className="Job_card" key={props.index}>
        <div className="Job_title">
        {Job.job_name}
        </div>
        <div className="Job_desc">
        {Job.job_desc}
        </div>
        <div className="min_rank">
       Rank required: {Job.minimum_rank}
        </div>
        <div className="company">
       Company : {Job.company}
        </div>
        <div className="company">
       Work : {Job.work}
        </div>
        <div className="company">
       Job type : {Job.type}
        </div>
        <div className="company">
       Vacancy : {Job.vacancy}
        </div>
        <div className="company">
          Location : {Job.location}
        </div>
        {/* <div className="Eligible_title">
          Candidates Eligible :

        </div>
        
        <div className="Eligible_stu_table">
          <div className="table_row you">
            <div className="Stu_name">
              You
            </div>
            <div className="Stu_uid">
              13133
            </div>
            <div className="Stu_position">
              #2
            </div>
          </div>
          <div className="table_row">
            <div className="Stu_name">
              Ramesh
            </div>
            <div className="Stu_uid">
              13124
            </div>
            <div className="Stu_position">
              #4
            </div>
          </div> <div className="table_row">
            <div className="Stu_name">
              Bill gates
            </div>
            <div className="Stu_uid">
              131333
            </div>
            <div className="Stu_position">
              #5
            </div>
          </div> <div className="table_row">
            <div className="Stu_name">
              Mahesh
            </div>
            <div className="Stu_uid">
              13133
            </div>
            <div className="Stu_position">
              #7
            </div>
          </div>
        </div> */}
        <div className="More_desc" onClick={()=>{window.open(Job.website_link)}}> 
          Visit Now
        </div>
    </div>
  )
}

export default Job_card