import React from 'react'
import './Skill_stars.css'
import { UisFavorite } from '@iconscout/react-unicons-solid';
import History_card from './History_card/History_card';
import { useState } from 'react';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import Cookies from 'universal-cookie';
import { db } from '../../firebase-config';
import { useEffect } from 'react';
import Loader from '../Loader';
const Skill_stars = () => {
  const [History, setHistory] = useState([]);
  const [Loading, setLoading] = useState(false);
  const cookies = new Cookies();
   const fetchpoints = async () => {
    const docRef = doc(db, "Students", cookies.get('user').phoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setpoints(docSnap.data().Points)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const fetchHistory = async () => {


    setLoading(true);
    const q = query(collection(db,'Students',cookies.get('user').phoneNumber,'History'), orderBy("Time",'desc'));
    onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setHistory([...res]);
       setLoading(false);
    });
    console.log(History)
  }


  const [points, setpoints] = useState('')
useEffect(() => {
    fetchpoints();
    fetchHistory();
  }, []);
  return (
    <div className="Skill_stars">
        <div className="Skillstars_title">
            Skill Stars
        </div>
        <div className="Head_container">


            <div className="first_cont">
            <div className="Skill_Stars">
              <UisFavorite className ="UisFavorite" size ="60px"/>
              {(points)?points:'...'}
            </div>
            <div className="Complete_sessions">
              Complete Sessions upto date for more skill stars
            </div>
            </div>



            <div className="Second_cont">
            <div className="Position">
              #{cookies.get('Rank')}
            </div>
            <div className="Do_projects">
              Ranking in Ranking board
            </div>
            </div>

        </div>

        <div className="Skill_stars_body">
          <div className="history_title">
            Skill Stars History
          </div>
          {History.length > 0 && History.map((History_block,index) => (

<History_card History_block = {History_block}/>
))}
        </div>
        {
      (Loading)?
      <Loader/>:null}
    </div>
  )
}

export default Skill_stars