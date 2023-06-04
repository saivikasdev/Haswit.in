import React, { useEffect, useState } from "react";
import "./My_journey.css";
import Cookies from "universal-cookie";
import { UisCheckCircle } from "@iconscout/react-unicons-solid";
import { UisTimesCircle } from "@iconscout/react-unicons-solid";
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
import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const My_journey = () => {
  const [Dates_, setDates_] = useState([]);
  const currentDate = new Date();
  const cookies = new Cookies();
  const year = currentDate.getFullYear();
  const [month, setmonth] = useState(currentDate.getMonth());
  const daysInMonth = new Date(year, month, 0).getDate();

  const firstDayOfMonth = new Date(currentDate.getFullYear(), month, 1);
  const weekdayPadding = firstDayOfMonth.getDay();
  const week_days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [Session, setSession] = useState("");
  const [session_name, setsession_name] = useState("");

  const session_name_set = (e) => {
    let session_name = e.target.value;
    setsession_name(session_name);
    console.log(session_name);
  };

  const [Session_date, setSession_date] = useState();
  const [Session_file, setSession_file] = useState("");
  const [Session_name, setSession_name] = useState("");
  const [Completed, setCompleted] = useState();
  const [Live, setLive] = useState();
  const [Time, setTime] = useState();

  const [loading, setLoading] = useState(false);
  const [Completed_session, setCompleted_session] = useState([]);
  const dates = [];
  useEffect(() => {
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

    console.log(Dates_);
  }, []);
  // Generate an array of dates for the current month
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
      const className = (index === currentDay&& month===currentDate.getMonth()) ? "block today" : "block";
      return name === null ? (
        <div class="block other">
          <div className="date__">😁</div>
          <div className="Session_name">
            <div className="text_"></div>
          </div>
        </div>
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
          <div className="date_status">
            <div className="date__">{name.getDate()}</div>
            <div className="icon_status">
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
                  <UisCheckCircle className="Done" size="15" />
                ) : (
                  <UisTimesCircle className="Undone" size="15" />
                )
              ) : (
                <UisTimesCircle className="Undone" size="15" />
              )}

              {Dates_.length > 29
                ? Dates_[name.getDate() - 1].live === true
                  ? "🛑"
                  : null
                : "...."}
            </div>
          </div>

          <div className="Session_name">
            <div className="text_">
              {Dates_.length > 29
                ? Dates_[name.getDate() - 1].session_name
                : "..."}
            </div>
          </div>
        </div>
      );
    });
  };
  const getWeekdays = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekdays.map((weekday, index) => (
      <div key={index} className="weekday">
        {weekday}
      </div>
    ));
  };
  return (
    <div className="My_journey">
      <div className="My_journey_title">MY JOURNEY</div>

      <div className="My_journey_course_name">MERN STACK</div>

      <div className="Calender_section">
        <div className="calendar">
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
          <div className="Calender_component">
            <div className="weekdays">{getWeekdays()}</div>
            <div className="calendar-dates">{renderDates()}</div>
          </div>
        </div>
        <div
          onClick={() => {
            cookies.set("session_date", Session_date, { path: "/" });
            cookies.set("session_month", month, { path: "/" });
          }}
        >


      
{(() => {
    if(Session_name&&Session_file){
      return <Link to="/record_detail">
            <div className="View_session_details">
              <div>Session Details</div>
              <div className="Session_live">{Live ? "🛑 Live now" : ""}</div>
              <div className="Session_date_">
                Date : {Session_date ? Session_date : "🤔"}
              </div>
              <div className="Session_name_">
                Session name : {Session_name ? Session_name : "😑"}
              </div>
              <div className="Completed">
                Your Status :
                {Completed_session.length > 0 ? (
                  Completed_session.includes(Session_date) ? (
                    <UisCheckCircle className="Done" size="15" />
                  ) : (
                    <UisTimesCircle className="Undone" size="15" />
                  )
                ) : (
                  <UisTimesCircle className="Undone" size="15" />
                )}
              </div>
              <div className="Session_time">
                Session time : {Time ? Time : "😪"}:00
              </div>
              <iframe
                className="Record_player_"
                src={
                  Session_file
                    ? Session_file + "/preview"
                    : "https://drive.google.com/file/d/1Albs2y1M5epcPVLcN4ib8KwpjP-1AzLd/preview"
                }
                allow="autoplay"
              >
                Video player does'nt support
              </iframe>
              <div className="go_to_test">View session</div>
            </div>
          </Link>
    }
    else{
  
    return  <Link to="/My_journey">
            <div className="View_session_details">
              <div>Session Details</div>
              <div className="Session_live">{Live ? "🛑 Live now" : ""}</div>
              <div className="Session_date_">
                Date : {Session_date ? Session_date : "🤔"}
              </div>
              <div className="Session_name_">
                Session name : {Session_name ? Session_name : "😑"}
              </div>
              <div className="Completed">
                Your Status :
                {Completed_session.length > 0 ? (
                  Completed_session.includes(Session_date) ? (
                    <UisCheckCircle className="Done" size="15" />
                  ) : (
                    <UisTimesCircle className="Undone" size="15" />
                  )
                ) : (
                  <UisTimesCircle className="Undone" size="15" />
                )}
              </div>
              <div className="Session_time">
                Session time : {Time ? Time : "😪"}:00
              </div>
              <iframe
                className="Record_player_"
                src={
                  Session_file
                    ? Session_file + "/preview"
                    : "https://drive.google.com/file/d/1Albs2y1M5epcPVLcN4ib8KwpjP-1AzLd/preview"
                }
                allow="autoplay"
              >
                Video player does'nt support
              </iframe>
              <div className="go_to_test">View session</div>
            </div>
          </Link>
    }
  })()}


        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default My_journey;
