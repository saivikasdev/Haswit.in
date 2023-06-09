import React, { useState } from "react";
import "./Sidebar.css";
import { Side_menu_data } from "./Side_menu_data";
import Tooltip from '@mui/material/Tooltip';
import Profile_pic from '../../images/bitmoji.png';
import { Link } from "react-router-dom";

import Cookies from 'universal-cookie';
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";


function Sidebar() {
  
  const cookies = new Cookies();
  const [profile_pic, setprofile_pic] = useState('')

  const [selected,setSelected] = useState(0)

  const fetchprofile_pic = async () => {
    const docRef = doc(db, "Students", cookies.get('user').phoneNumber);
    const docSnap = await getDoc(docRef);
    // console.log("Document data:", docSnap.data().profile_pic);
    if (docSnap.exists()) {
      setprofile_pic(docSnap.data().profile_pic)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }



  fetchprofile_pic();

  return (
    <div className="Sidebar">
      <div className="Up_sidebar">

      <div className="logo">H</div>
      <div className="main_menu">
        {Side_menu_data.map((item, index) => {
          return (
           <Tooltip title = {item.name} key={index}>
            
            <Link to={item.link}>
             <div className={selected === index?'menu_item active': 'menu_item'} key ={index} 
             onClick={() => setSelected(index)}
             >
              
              <item.icon color={selected === index?'white': '#777777'} className="icon__"/>
            </div>
            
            </Link>
           </Tooltip>
          );
        })}
      </div>
      </div>
      <div className="profile_pic_cont">
        
      <Link to= '/Profile_page  '>
        <img src= {profile_pic} className="profile_image" onClick={()=>{

        }}/>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
