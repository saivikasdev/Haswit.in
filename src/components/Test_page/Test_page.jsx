import React, { useState, useEffect } from "react";
import "./Test_page.css";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Cookies from "universal-cookie";

import { UisFavorite } from "@iconscout/react-unicons-solid";
const Quiz = () => {
  
  const cookies = new Cookies();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
const [Students, setStudents] = useState([]);
  const [timerProgress, setTimerProgress] = useState(100);
  const [showResult, setShowResult] = useState(false);
  // Dummy data for questions
  const dummyData = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      answer: 2,
    },
    {
      question: "masteheaedhdv dfsijfvdvpodvsm ds dsjdvsdsv",
      options: ["cascads", "dcascca", "vdasvdv", "davava"],
      answer: 2,
    },
    {
      question: "csacsavadvvdvsdbdfbeafbrt grnrn ngn rn",
      options: ["rgvervr", "gerger", "gregge", "dcdcsd"],
      answer: 2,
    },
    // Add more dummy data for additional questions
  ];

  const Students_ = [cookies.get('user').phoneNumber.toString(),];
  const [Loading, setLoading] = useState(false);

  const [Points, setPoints] = useState();





  const fetchData = async () => {
    const docRef = doc(
      db,
      cookies.get("session_month").toString(),
      cookies.get("session_date").toString()
    );
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setSession_file(docSnap.data().session_file);
      setSession_date(docSnap.data().date);
      setSession_name(docSnap.data().session_name);

     (docSnap.data().Students)? docSnap.data().Students.map(async (Student, index) => {
        console.log(Student)
        if (!Students_.includes(Student)) {
          Students_.push(Student);
     }
        console.log(Students_)
          await updateDoc(
      doc(db, 
        cookies.get("session_month").toString(),
        cookies.get("session_date").toString(),),
      {
        Students:Students_
      },
      { merge: true }
    ).then(async () => {
    });

    }):
        await updateDoc(
    doc(db, 
      cookies.get("session_month").toString(),
      cookies.get("session_date").toString(),),
    {
      Students:Students_
    },
    { merge: true }
  ).then(async () => {
  });


    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };


  const fetchQuestions = async () => {
    setLoading(true);
    const q = query(
      collection(
        db,
        cookies.get("session_month").toString(),
        cookies.get("session_date").toString(),
        "Questions"
      )
    );
    onSnapshot(q, (querySnapshot) => {
      const res = [];
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setQuestions([...res]);
      setLoading(false);
    });

  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      setTimerProgress((timeLeft / 10) * 100);
    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft]);


  const [Session_date, setSession_date] = useState();
  const [Session_file, setSession_file] = useState("");
  const [Session_name, setSession_name] = useState("");


  useEffect(() => {

    

    fetchQuestions();
    fetchData();

    fetch_points();





    // setStudents([...Students,cookies.get('user').phoneNumber.toString()]);


    
    // add_student();



    // Fetch or set questions from an API or database here
  }, []);





  const add_student = async () => {

console.log(Students_);

    // await updateDoc(
    //   doc(db, 
    //     cookies.get("session_month").toString(),
    //     cookies.get("session_date").toString(),),
    //   {
    //     Students:Students_
    //   },
    //   { merge: true }
    // ).then(async () => {
    // });

  }

  const handleAnswerOptionClick = (selectedOptionindex) => {
    
    
    console.log(Students_+"----");
    if (selectedOptionindex === Number(questions[currentQuestion].Correct)) {
      setScore(score + 1);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }

    handleNextQuestion();
    add_student()
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10); // Reset timer for next question
    } else {
      // Quiz completed, show score
      
      setShowResult(true);
      
      add_points();
    }
  };

  const fetch_points = async () => {
    const docRef = doc(db, "Students", cookies.get('user').phoneNumber.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPoints(docSnap.data().Points);

      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const add_points = async () => {
    console.log(Number(score+Points+1)+'---'+ score+ Points+1)
    await updateDoc(
      doc(db, "Students", cookies.get('user').phoneNumber.toString()),
      {
        Points: Number(score+Points),
      },
      { merge: true }
    ).then(async () => {
    });

    await setDoc(
      doc(
        db,
        "Students",cookies.get('user').phoneNumber.toString(),
        "History",
        Date().toString()
      ),
      {
        Points: score+1,
        Source: Session_name,
        Time: Date().toString(),
      },
      { merge: true }
    ).then(() => {
      // alert("Points added for session");
    });

    await updateDoc(
      doc(db, cookies.get("session_month").toString(),
      cookies.get("session_date").toString()),
      {
        




        ////
      },
      { merge: true }
    ).then(() => {
      console.log("//////////");
    });
    

  };

  if (showResult) {
    const skippedQuestions = questions.length - (score + wrongAnswers.length);

    return (
      <div className="quiz-app">
        <h2>Session Result</h2>
        <h1>
          You earned {score}
          <UisFavorite onClick={()=>{
            
        Students_.push('master')
    console.log(Students_);}} className="UisFavorite" size="50px" />
        </h1>
        <p>Total Questions: {questions.length}</p>
        <p>Correct Answers: {score}</p>
        <p>Wrong Answers: {wrongAnswers.length}</p>
        <p>Skipped Questions: {skippedQuestions}</p>
      </div>
    );
  }

  return (
    <div className="quiz-app">
      {(Students_.length>0 )? Students_+"xs" : '....'}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${timerProgress}%` }}
        ></div>
      </div>
      <div className="question">
        <p>{questions[currentQuestion]?.Question}</p>
      </div>
      <div className="timer">
        <p>{timeLeft}s</p>
      </div>
      <div className="options">
        {questions[currentQuestion]?.Options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerOptionClick(index)}>
            {option}
          </button>
        ))}
      </div>
      <div className="Question_progress">
        {currentQuestion + 1}/{questions.length}
      </div>
      {Session_name ? Session_name : "Get ready"} -{" "}
      {Session_date ? "" + Session_date + "" : ""}
    </div>
  );
};

export default Quiz;
