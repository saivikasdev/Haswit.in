import React, { useEffect, useState } from "react";
import "./Project_details.css";
import { UisFavorite } from '@iconscout/react-unicons-solid';
import spinner from '../../../images/fidget.png';
import Cookies from "universal-cookie";
import { addDoc, collection, deleteDoc, doc, getDoc,onSnapshot,query,setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

import storage from "../../../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from "../../Loader";
import { ToastContainer, toast } from "react-toastify";
const Project_details = (props) => {

const [Bids, setBids] = React.useState([]);
const [loader, setloader] = useState();
  const fetchBids = async () => {
setloader(true)

    const q = query(collection(db, "Projects",cookies.get('project'),'Bids'),);
    onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setBids([...res]);
    });
setloader(false)

  }
  
  useEffect(() => {
    fetchBids()
    fetchDetails()
  }, [])


  const File_upload = async (e) => {
    setloader(true)
    e.preventDefault();
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef =  ref(storage, `/Solved_projects/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask =  uploadBytesResumable(storageRef, file);
   uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      async () => {
        // download url
       await getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          console.log(url);
          await setDoc(
            doc(db,'Projects_solutions_pending',cookies.get('user').phoneNumber),
            {
              Project: cookies.get('project'),
              User:cookies.get('user').phoneNumber,
              Project_file:url,
              Project_points:Project.Points
              
            },
            { merge: true }
          ).then(() => {

          });


          await setDoc(
            doc(db,'Projects',cookies.get('project'),'Bids',cookies.get('user').phoneNumber),
            {
              User:cookies.get('user').phoneNumber,
              
            },
            { merge: true }
          ).then(() => {
            toast('Project Uploaded Soon Admin will check it and add points', {
              position: toast.POSITION.BOTTOM_LEFT,
              className: 'toast-message'
          })
          });

        });
      }
    );
    setloader(false);
  };
  const cookies = new Cookies();
  const { project } = props
  const [file, setFile] = useState("");
const [Percent, setPercent] = useState()

const [Project, setProject] = useState([])


  const fetchDetails = async () => {
    setloader(true)

    const docRef = doc(db, "Projects", cookies.get('project'));
    const docSnap = await getDoc(docRef);
    
    console.log("Document data:", docSnap.data().Project_name);
    if (docSnap.exists()) {
      setProject(docSnap.data())
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    
    console.log("No such document!");
  
    setloader(false)
  };




  function handleChange(event) {
    setloader(true)
    setFile(event.target.files[0]);
    setloader(false)
  }



  return (
    <div className="Project_details">
      <div className="Project_details_title">{cookies.get('project')} project-details</div>
     <div className="image_body_row">
     <div className="Project_details_body">
        <div className="point_get">
          Points for this project :
          {Project.Points}
            <UisFavorite/>
        </div>
        <div className="Requirements_description">
          <div className="Project_name">
            Project name : 
         {cookies.get('project')}
          </div>
          <div className="Project_desc_title">
            Requirements Description : _
            <div className="Project_desc">
            {Project.Details}
            </div>

          </div>
        </div>
        <div className="end_date">
            {Project.End_date}
        </div>
<form onSubmit={File_upload} className="Project_submit">
  
<input type="file" onChange={handleChange} required/>
<button className="i_will_make_button" type="submit">
          Upload 
        </button>
        
</form>

        
        <div className="process_project">
          Do the project, Select it, upload it here before the end date to earn the skill stars...<br/>
          Our Mentor will view your file, add you points..

        </div>
      </div>
      
      <div className="Column">
      <img src=
         
         {Project.image} alt="" className="project_image"/>
         <div className="Bids">
          <div className="Bids_head">
            
        Already Bidded Students {Bids.length}/5
          </div>
      {Bids.length > 0 && Bids.map((Bid,index) => (

<div className="Bid_card">
  {Bid.User}
</div>
))}
      </div>
      </div>
     </div>
      
     {
      (loader)?
      <Loader/>:null}
      <ToastContainer/>
    </div>
  );
};

export default Project_details;
