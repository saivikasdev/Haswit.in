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
         
    console.log(Jobs);
      });
    
    };

    fetchData();
    
  }, []);


  return (
    <div className="Ranking_card">
              <div class="container_ d-flex justify-content-center mt-5">

<div class="card___">
  
  <div class="top-container_">
    
    <img src={Profile_pic} class="img-fluid profile-image" width="70"/>
    
    <div class="ml-3">
      <h5 class="name">{(Student)?Student.Name:'....'}</h5>
      <p class="mail">UID : {(Student)?Student.UID:'....'}</p>
    </div>
  </div>


  <div class="middle-container_ d-flex justify-content-between align-items-center mt-3 p-2">
      <div class="hashtag-div px-3">
        
        <div class="round-div"><i class="fa hashtag">#</i></div>

      </div>
      <div class="d-flex flex-column text-right mr-2">
        <span class="current-balance">#{(Student)?props.index+1:'....'}</span>
        <span class="amount"><span class="hashtag-sign"><UisFavorite color="#8757f9"/></span>{(Student)?Student.Points:'....'}</span>
      </div>

  </div>

  <div class="recent-border mt-4">
    <span class="recent-orders">Eligible Jobs</span>
  </div>

  {Jobs.length > 0 &&
        Jobs.map((Job, index) => (
          <div class="wishlist-border pt-2">
    <span class="wishlist">{Job.job_name}</span>
  </div>
        ))}
  



  <div class="fashion-studio-border pt-2">
    <span class="fashion-studio">No more..</span>
  </div>
  
</div>

</div>
    </div>
  )
}

export default Ranking_card