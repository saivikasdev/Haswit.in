import React, { useEffect, useState } from "react";
import "./Ranking.css";
import Ranking_card from "./Ranking_card/Ranking_card";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import Loader from "../Loader";
import Cookies from "universal-cookie";
const Ranking = () => {

  const [Students, setStudents] = useState([])

  const [loading, setLoading] = useState(false);



  const [points, setpoints] = useState('')
  const cookies = new Cookies();
 const [Rank, setRank] = useState();

  useEffect(() => {
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

  fetchpoints();
    const fetchData = async () => {
      setLoading(true);
      const q = query(collection(db, "Students"),orderBy("Points","desc"));
      onSnapshot(q, (querySnapshot) => {
        const Projects = [];
        querySnapshot.forEach((doc) => {
          Projects.push(doc.data());
        });
        setStudents([...Projects]);
         setLoading(false);
         
    // console.log(Students);
      });
    
    };

    fetchData();
    
  }, []);


  return (
    <div className="Ranking">
      <div className="Ranking_title">
      Ranking Board
      </div>
      <div className="Headings_grid">
        <div className="Complete_rec">
        # Complete <span>Records</span> Upto Date 
        </div>
        <div className="Do_projects_">
        # Look for projects to Earn More <span>Skill Stars</span>
        </div>
        <div className="To_get_job">
        # You may get a <span>job or intership </span>by The End Of Course
        </div>
        <div className="Skill_stars">
        # You Had <span>{(points)?points:'...'}</span> Skill Stars
        </div>
        <div className="position">
        # You Are In <span>{Number(cookies.get('Rank'))}</span> Position
        </div>
      </div>
      <div className="Cards">
      {Students.length > 0 &&
        Students.map((Student, index) => {
          if(Student.Phone===cookies.get('user').phoneNumber)
          {
            cookies.set('Rank', index+1, { path: '/' })
          }

         return <Ranking_card Student={Student} index ={index} key={index}/>

      })}
      </div>
      {
      (loading)?
      <Loader/>:null}
    </div>
  );
};

export default Ranking;
