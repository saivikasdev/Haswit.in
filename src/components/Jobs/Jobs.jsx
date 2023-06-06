import React, { useEffect, useState } from 'react'
import './Jobs.css'
import Job_card from './Job_card/Job_card'
import { db } from '../../firebase-config';
import { doc, setDoc ,query,collection,onSnapshot } from "firebase/firestore";
import Loader from '../Loader';
const Jobs = () => {
const [Jobs, setJobs] = useState([])

const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const q = query(collection(db, "Jobs"),);
    onSnapshot(q, (querySnapshot) => {
      const Jobs = [];
      querySnapshot.forEach((doc) => {
        Jobs.push(doc.data());
      });
      setJobs([...Jobs]);
       setLoading(false);
    });
  
  };

  useEffect(() => {
    fetchData();
  }, []);





  return (
    <div className="Jobs_">
        <div className="jobs_title">
          Jobs_interships
        </div>
<div className="Job_card_grid">
{Jobs.length > 0 &&
        Jobs.map((Job, index) => (
          <Job_card Job={Job}/>
        ))}

</div>
{
      (loading)?
      <Loader/>:null}
    </div>
  )
}

export default Jobs