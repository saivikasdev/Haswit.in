import React from "react";
import Current_sessions from "./Current_sessions/Current_sessions";
import "./Left_mini_calender.css";
import "./Scrollable_calender/Scrollable_calender.css";
import "./Current_sessions/Current_session.css";
import { Scroll_calender_data } from "./Scrollable_calender/Scroll_calender_data";
import { UisCheckCircle } from "@iconscout/react-unicons-solid";
import Scrollable_calender from "./Scrollable_calender/Scrollable_calender";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase-config";
import Cookies from "universal-cookie";
import { UisArrowCircleRight } from "@iconscout/react-unicons-solid";
import { UisTimesCircle } from "@iconscout/react-unicons-solid";
const Left_mini_calender = () => {
  const [Completed_session, setCompleted_session] = useState([]);

  const [Dates_, setDates_] = useState([]);
  const currentDate = new Date();
  const cookies = new Cookies();
  const year = currentDate.getFullYear();
  const [month, setmonth] = useState(currentDate.getMonth());
  const daysInMonth = new Date(year, month, 0).getDate();

  const [loading, setLoading] = useState(false);
  const firstDayOfMonth = new Date(currentDate.getFullYear(), month, 1);
  const weekdayPadding = firstDayOfMonth.getDay();
const [Current_date, setCurrent_date] = useState();
const [Current_file, setCurrent_file] = useState();
const [Current_name, setCurrent_name] = useState();
  const [Session_date, setSession_date] = useState();
  const [Session_file, setSession_file] = useState("");
  const [Current_file_doc, setCurrent_file_doc] = useState("");
  const [Session_name, setSession_name] = useState("");
  const [Completed, setCompleted] = useState();
  const [Live, setLive] = useState();
  const [Time, setTime] = useState();
  const [Test, setTest] = useState();
  const week_days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];
  const dates = [];


  useEffect(() => {

    const fetch_current = async () =>{
        const docRef = doc(db, currentDate.getMonth().toString(), currentDate.getDate().toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCurrent_file(docSnap.data().file);
      setCurrent_file_doc(docSnap.data().session_file)
      setCurrent_date(docSnap.data().date);
      setCurrent_name(docSnap.data().session_name);
      setTest(docSnap.data().test);


      console.log(docSnap.data().session_file);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");}
    }

    fetch_current()
    
    // Fetch documents from Firebase and update the state
    const fetchData = async () => {
      setLoading(true);
      const q = query(collection(db, month.toString()), orderBy("date"));
      const qq = query(
        collection(db, month.toString()),
        where(
          "Students",
          "array-contains",
          "" + cookies.get("user").phoneNumber
        )
      );

      onSnapshot(q, (querySnapshot) => {
        const res = [];
        querySnapshot.forEach((doc) => {
          res.push(doc.data());
        });
        setDates_([...res]);
        setLoading(false);
      });

      onSnapshot(qq, (querySnapshot) => {
        const res = [];
        querySnapshot.forEach((doc) => {
          res.push(doc.data().date);
        });
        setCompleted_session([...res]);
      });
    };
    fetchData();

    // console.log(Dates_);
  }, []);



  const getDatesForMonth = () => {
    for (let i = 1; i <= weekdayPadding; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= daysInMonth + 1; i++) {
      const date = new Date(year, month, i);
      dates.push(date);
    }
    return dates; // Filter out weekends (Sunday = 0, Saturday = 6)
  };

  const renderDates = () => {
    const dates = getDatesForMonth();

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    return dates.map((name, index) => {
      const className = (index === currentDay+3&& month === currentDate.getMonth()) ? "day_date current" : "day_date";
      return name === null ? (
       null
      ) : (
        <div
          key={index}
          className={className}
          onClick={async () => {
            setSession_date(name.getDate());

            const docRef = doc(db, month.toString(), name.getDate().toString());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setSession_file(docSnap.data().session_file);
              setCompleted(docSnap.data().file);
              setSession_date(docSnap.data().date);
              setLive(docSnap.data().live);
              setSession_name(docSnap.data().session_name);
              setTime(docSnap.data().time);

              console.log(docSnap.data().session_file);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          }}
        >
          <div className="date">{name.getDate()}</div>
          <div className="day">
              {Dates_.length > 29
                ? week_days[name.getDay()]
                : "..."}
            </div>
          <div className="status">
            {/* {Dates_.length > 29 ? (
                Dates_[name.getDate() - 1].file === true ? (
                  <UisCheckCircle className="Done" size="15" />
                ) : (
                  <UisTimesCircle className="Undone" size="15" />
                )
              ) : (
                "...."
              )} */}

            {Completed_session.length > 0 ? (
              Completed_session.includes(name.getDate()) ? (
                <UisCheckCircle size="15" color="#ffffffd3" />
              ) : (
                <div>
                    
                </div>
              )
            ) : (
              <div></div>
            )}

            {Dates_.length > 29
              ? Dates_[name.getDate() - 1].live === true
                ? "🛑"
                : null
              : "...."}
          </div>

            
        </div>
      );
    });
  };

  return (
    <div className="Left_mini_calender">
      <div className="Left_mini_calender_container">
        <div className="title">
          <div className="Main_title">
            <h3>Your Progress</h3>
          </div>

          <div className="Calender_month">
          <div className="Months">
            {/* <div
              className={month === 4 ? "Current_month" : "Month"}
              onClick={() => {
                setmonth(4);
                console.log(month);
                console.log(daysInMonth);
                console.log(Dates_.length);

                const q = query(collection(db, "" + 4), orderBy("date"));
                onSnapshot(q, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data());
                  });
                  setDates_([...res]);
                });

                const qq = query(
                  collection(db, "" + 4),
                  where(
                    "Students",
                    "array-contains",
                    "" + cookies.get("user").phoneNumber
                  )
                );

                onSnapshot(qq, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data().date);
                  });
                  setCompleted_session([...res]);
                });
              }}
            >
              May
            </div> */}
            <div
              className={month === 5 ? "Current_month" : "Month"}
              onClick={() => {
                setmonth(5);
                console.log(month);
                console.log(daysInMonth);
                console.log(Dates_.length);

                const q = query(collection(db, "" + 5), orderBy("date"));
                onSnapshot(q, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data());
                  });
                  setDates_([...res]);
                });

                const qq = query(
                  collection(db, "" + 5),
                  where(
                    "Students",
                    "array-contains",
                    "" + cookies.get("user").phoneNumber
                  )
                );
                onSnapshot(qq, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data().date);
                  });
                  setCompleted_session([...res]);
                });
              }}
            >
              June
            </div>
            <div
              className={month === 6 ? "Current_month" : "Month"}
              onClick={() => {
                setmonth(6);

                console.log(month);
                console.log(daysInMonth);
                console.log(Dates_.length);

                const q = query(collection(db, "" + 6), orderBy("date"));
                onSnapshot(q, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data());
                  });
                  setDates_([...res]);
                });

                const qq = query(
                  collection(db, "" + 6),
                  where(
                    "Students",
                    "array-contains",
                    "" + cookies.get("user").phoneNumber
                  )
                );

                onSnapshot(qq, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data().date);
                  });
                  setCompleted_session([...res]);
                });
              }}
            >
              July
            </div>
            <div
              className={month === 7 ? "Current_month" : "Month"}
              onClick={() => {
                setmonth(7);
                console.log(month);
                console.log(daysInMonth);
                console.log(Dates_.length);

                const q = query(collection(db, "" + 7), orderBy("date"));
                onSnapshot(q, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data());
                  });
                  setDates_([...res]);
                });

                const qq = query(
                  collection(db, "" + 7),
                  where(
                    "Students",
                    "array-contains",
                    "" + cookies.get("user").phoneNumber
                  )
                );

                onSnapshot(qq, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data().date);
                  });
                  setCompleted_session([...res]);
                });
              }}
            >
              August
            </div>

            <div
              className={month === 8 ? "Current_month" : "Month"}
              onClick={() => {
                setmonth(8);
                console.log(month);
                console.log(daysInMonth);
                console.log(Dates_.length);

                const q = query(collection(db, "" + 8), orderBy("date"));
                onSnapshot(q, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data());
                  });
                  setDates_([...res]);
                });

                const qq = query(
                  collection(db, "" + 8),
                  where(
                    "Students",
                    "array-contains",
                    "" + cookies.get("user").phoneNumber
                  )
                );

                onSnapshot(qq, (querySnapshot) => {
                  const res = [];
                  querySnapshot.forEach((doc) => {
                    res.push(doc.data().date);
                  });
                  setCompleted_session([...res]);
                });
              }}
            >
              September
            </div>

          </div>

          <Link to="/My_journey">
            <div className="Full_calender">View Calender</div>
          </Link></div>
        </div>
        <div className="Scrollable_calender">{renderDates()}</div>
        <div className="Current_sessions">
          <div className="text">
            <h1>my progress</h1>
          </div>
          <div
          onClick={
            (Session_date&&month)?  () => {
            console.log('clicked')
            cookies.set("session_date", Session_date, { path: "/" });
            cookies.set("session_month", month, { path: "/" });
            cookies.set('Test',Test, { path: '/' })
          }  :  null
        
          
        }
        >
          <Link to={(Session_name&&Session_file) ? "/record_detail" : "/home"}>
            <div className="session">
              <div className="name">{Session_name ? Session_name : "Select any Date"}</div>
              <div className="date_">{Session_date ? Session_date : "🤔"}/0{month}</div>
              <div className="now">Watch Now ▶</div>
            </div>
          </Link>
          </div>
          <div
          onClick={
            (Current_name&&Current_file&&Current_file_doc)?  () => {
              console.log('clicked')
              cookies.set("session_date", currentDate.getDate(), { path: "/" });
              cookies.set("session_month", currentDate.getMonth(), { path: "/" });

            }  :  null
          }
          
         



        >
          <Link to={(Current_name&&Current_file&&Current_file_doc) ? "/record_detail" : "/home"}>
            <div className="session">
              <div className="name">{(Current_name)?Current_name : '...'}</div>
              <div className="date_">{currentDate.getDate()}/0{currentDate.getMonth()}</div>
              <div className="now">Watch Now ▶</div>
            </div>
          </Link>
          </div>
          <Link to="/My_journey">
            <div className="viewmore">
              <div className="view_more_text">
                Complete remaining sessions to earn skill stars
              </div>
              <UisArrowCircleRight
                size="70px"
                color="rgba(238, 238, 238, 0.904)"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Left_mini_calender;
