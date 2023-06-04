import React, { useEffect, useState } from 'react'
import './Projects_block.css'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
const Projects_block = () => {
  const [projects, setprojects] = useState([]);
const [Loading, setLoading] = useState()
  const fetchData = async () => {
    setLoading(true);
    const q = query(collection(db, "Projects"),);
    onSnapshot(q, (querySnapshot) => {
      const Projects = [];
      querySnapshot.forEach((doc) => {
        Projects.push(doc.data());
      });
      setprojects([...Projects]);
       setLoading(false);
       console.log(projects);
    });
  
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="Projects_block">
        <div className="projects_available">
        Projects Available
        </div>
        <div className="number">
          
          {projects.length}
        </div>
    </div>
  )
}

export default Projects_block