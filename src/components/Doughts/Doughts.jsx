import React, { useState } from "react";
import "./Doughts.css";
import Dought_list_tile from "./Dought_list_tile/Dought_list_tile";
import { UilSearch } from "@iconscout/react-unicons";
import { setDoc,doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect } from "react";
import { getDoc } from "firebase/firestore";
import Cookies from 'universal-cookie';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authentication } from "../../firebase-config";
import { collection,query,onSnapshot ,Timestamp} from "firebase/firestore";
import Loader from "../Loader";
const cookies = new Cookies();
const Doughts = () => {
  const [currentuser, setcurrentuser] = useState(false)
  const [user_name, setuser_name] = useState('')
  const [UID, setUID] = useState('')
  const [phone, setphone] = useState('')
  const [profile_pic, setprofile_pic] = useState('')
const [dought, setdought] = useState('')
  const [Loading, setLoading] = useState(false)
  const [doughts, setdoughts] = useState([])
  const [Searchtext, setSearchtext] = useState('')
const date = new Date();
const showTime = date.getDate()+'/'+(date.getMonth()+1)+' '+date.getHours() 
    + ':' + date.getMinutes() 
    + ":" + date.getSeconds(); 
  const dought_set = (e) => {
    let dought = e.target.value;
    setdought(dought);
  };


  const Setdata = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (dought.length > 15) {
      await setDoc(
        doc(db, "Doughts", dought.toString()),
        {
          Dought: dought,
          Username: user_name,
          UID:UID,
          phone:phone,
          profile_pic:profile_pic,
          time:showTime


        },
        { merge: true }
      ).then(() => {
        setdought_form(false);
        toast('Dought posted successfully', {
          position: toast.POSITION.BOTTOM_LEFT,
          className: 'toast-message'
      })
      });
    } else {
      
    }
    
    setLoading(false)
  };



  const fetchDoughts = async () => {
    setLoading(true);
    const q = query(collection(db, "Doughts"),);
    onSnapshot(q, (querySnapshot) => {
      const Doughts = [];
      querySnapshot.forEach((doc) => {
        Doughts.push(doc.data());
      });
      setdoughts([...Doughts]);
       setLoading(false);
    });
  
  };

  useEffect(() => {
    fetchDoughts();
  }, []);




  const fetchUsername = async () => {
    

    const docRef = doc(db, "Students", 
    cookies.get('user').phoneNumber);
    const docSnap = await getDoc(docRef);
    
    console.log("Document data:", docSnap.data().Name);
    if (docSnap.exists()) {
      setuser_name(docSnap.data().Name)
      setUID(docSnap.data().UID)
      setphone(docSnap.data().Phone)
      setprofile_pic(docSnap.data().profile_pic)
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    
    console.log("No such document!");
  
  };


  useEffect(() => {
    onAuthStateChanged(authentication,(user)=>{
      setcurrentuser(user.phoneNumber)
    });




  }, [])


  fetchUsername();


  const [dought_form, setdought_form] = useState(false)
  return (
    <div className="Doughts">
      <div className="Header_doughts">
        <div className="Doughts_title">Doughts</div>
        <div className="Header_right">

        <div className="Search">
          <div className="Search_input">
            <input type="text" placeholder="Search" onChange={
              (e)=>{
                setSearchtext(e.target.value);


              }
            }/>
          </div>
          <UilSearch onClick={
            (e)=>{

              // e.preventDefault();
              // setdoughts(doughts.filter((dought)=>dought.Dought.toLowerCase().includes(Searchtext.toLowerCase)));
              // console.log(doughts)
              // console.log('/////////')
            }
          }/>
        </div>


        <div className="Post_dought" onClick={()=>{
          setdought_form(!dought_form)
        }}>Post My Dought</div>
        </div>
      </div>

      {dought_form === true ? (
      <>
        <form onSubmit={Setdata} className="add_dought_form">
          <textarea
            onChange={dought_set}
            type="text"
            className="project_details"
            placeholder="Your dought (Should not contain '/')"
            rows="10"
            cols="130"
            minLength="15"
            required
          ></textarea>
            

            <button type="submit" className="post_dought_button">
              Post
            </button>
        </form>
      </>
    ) : null}



      <div className="Doughts_list">

      {doughts.length > 0 &&
        doughts.filter((val)=>{
          if(Searchtext == ""){
return val
          }
          else if(val.Dought.toLowerCase().includes(Searchtext.toLowerCase())){
return val
          }
        }).map((dought, index) => (
          <Dought_list_tile dought={dought}/>
        ))}
      </div>
        <ToastContainer />
        {
      (Loading)?
      <Loader/>:null}
    </div>
  );
};

export default Doughts;
