import { collection, onSnapshot, query } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
import { db } from "../../firebase-config";
import "./My_codes.css";
import My_code_card from "./My_code_card/My_code_card";
import Loader from "../Loader";
const My_codes = () => {
const [Loading, setLoading] = useState(false)
const [Codes, setCodes] = useState([])
const cookies = new Cookies();
  const fetchNotes = async () => {


    setLoading(true);
    const q = query(collection(db, 'Students', cookies.get('user').phoneNumber,'Codes'),);
    onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setCodes([...res]);
       setLoading(false);
    });
  }

  useEffect(() => {
      fetchNotes()
  }, [])
  
  return (
    <div className="My_codes">
      <div className="My_codes_title">
      My Codes
      </div>
     <div className="My_codes_grid">
     {Codes.length > 0 && Codes.map((Code,index) => (

<My_code_card Code={Code} key={index}/>
))}
     </div>
     {
      (Loading)?
      <Loader/>:null}
    </div>
  );
};

export default My_codes;
