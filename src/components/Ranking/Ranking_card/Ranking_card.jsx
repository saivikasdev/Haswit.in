import React, { useEffect, useState } from 'react'
import './Ranking_card.css'

import { UisFavorite } from '@iconscout/react-unicons-solid';
import Profile_pic from '../../../images/bitmoji.png';
import { db } from '../../../firebase-config';
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
const Ranking_card = (props) => {

  const {Student} = props;

const [Jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      const q = query(collection(db, "Jobs"),where("minimum_rank", ">", ""+props.index));
      onSnapshot(q, (querySnapshot) => {
        const Projects = [];
        querySnapshot.forEach((doc) => {
          Projects.push(doc.data());
        });
        setJobs([...Projects]);
         setLoading(false);
         
    // console.log(Jobs);
      });
    
    };

    fetchData();
    
  }, []);


  return (
    <div className="Ranking_card" key={props.index}>
              <div className="container_ d-flex justify-content-center mt-5">

<div className="card___">
  
  <div className="top-container_">
    
    <img src={(Student)?Student.profile_pic:'....'} className="img-fluid profile-image" width="70"/>
    
    <div className="ml-3">
      <h5 className="name">{(Student)?Student.Name:'....'}</h5>
      <p className="mail">UID : {(Student)?Student.UID:'....'}</p>
    </div>
  </div>


  <div className="middle-container_ d-flex justify-content-between align-items-center mt-3 p-2">
      <div className="hashtag-div px-3">
        
        <div className="round-div"><i className="fa hashtag">#</i></div>

      </div>
      <div className="d-flex flex-column text-right mr-2">
        <span className="current-balance">#{(Student)?props.index+1:'....'}</span>
        <span className="amount"><span className="hashtag-sign"><UisFavorite color="#8757f9"/></span>{(Student)?Student.Points:'....'}</span>
      </div>

  </div>

  <div className="recent-border mt-4">
    <span className="recent-orders">Eligible Jobs</span>
  </div>

  {Jobs.length > 0 &&
        Jobs.map((Job, index) => (
          <div className="wishlist-border pt-2" key={index}>
    <span className="wishlist">{Job.job_name}</span>
  </div>
        ))}
  



  <div className="fashion-studio-border pt-2">
    <span className="fashion-studio">No more..</span>
  </div>
  
</div>

</div>
    </div>
  )
}

export default Ranking_card