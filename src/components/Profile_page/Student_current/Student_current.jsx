import React from "react";
import "./Student_current.css";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
const Student_current = () => {
    const fetchprofile_pic = async () => {
    const docRef = doc(db, "Students", cookies.get('user').phoneNumber);
    const docSnap = await getDoc(docRef);
    console.log("Document data:", docSnap.data().profile_pic);
    if (docSnap.exists()) {
      setpoints(docSnap.data().Points)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    fetchprofile_pic()
  }, []);

  const [points, setpoints] = useState()
  const currentDate = new Date();
  const currentDay_ = currentDate.getDate();
const [month, setmonth] = useState(currentDate.getMonth());
  const cookies = new Cookies();
  return (
    <div className="Student_current">
      <div className="Skill_stars_gained">
        <div className="Skill_stars_value">{points}</div>
        Skill Stars Gained
      </div>
      <div className="Ranking_position">
        <div className="Ranking_position_value">{cookies.get('Rank')}</div>
        Position in Ranking Board
      </div>
      <div className="Percentage_completed_">
        <div className="Percentage_completed_value">
        {Math.round(((currentDay_*(month-4))/80)*100)}%</div>
        Training completed
      </div>
      <div className="Days_left">
        <div className="Days_left_value">{90-(currentDay_+((month-5)*30))}</div>
        Days left
      </div>
    </div>
  );
};

export default Student_current;
