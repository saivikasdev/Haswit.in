import React from 'react'
import { Link } from 'react-router-dom'
import './Dought_list_tile.css'
import Cookies from "universal-cookie";
import { useState } from 'react';
import { doc, setDoc,getDoc ,collection,query,onSnapshot,} from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useEffect } from 'react';
const Dought_list_tile = (props) => {

  const cookies = new Cookies();
    
  const { dought } = props
const [answers, setanswers] = useState([])
const [Loading, setLoading] = useState(false)
  const fetchAnswers = async () => {


    setLoading(true);
    const q = query(collection(db, "Doughts", dought.Dought,'answers'),);
    onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setanswers([...res]);
       setLoading(false);
    });
  }

  useEffect(() => {
      fetchAnswers()
  }, [])

  return (
    <Link to='/Dought_detail'>   <div className="Dought_list_tile" onClick={
      ()=>{
        cookies.set('dought', dought.Dought, { path: '/' })

      }
    } key={props.index}>
        <div className="Dought_que">
            {dought.Dought}
        </div>
        <div className="Answer_number">
             {answers.length} Answers
        </div>
        <div className="Doughter_name">
        {dought.Username}
        </div>
        <div className="Doughter_UID">
            UID : 
        {dought.UID}
        </div>
        <div className="Posted_at">
        {dought.time}
        </div>
        <div className="Look_into">
            Check
            <div className="arrow_dought">
    &gt;
</div>
        </div>

    </div>
    </Link>
 
  )
}

export default Dought_list_tile