import React from 'react'
import './My_note_card.css'
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
const My_note_card = (props) => {
  const cookies = new Cookies();
  const {Note} = props
  return (
    <Link to="/Note_detail">
    <div className="My_note_card" onClick={()=>{
      
      cookies.set('Note', Note.Note_title, { path: '/' })
    }} key={props.index}>
<div className="card card__">
      <h2 className="card__title">{Note.Note_title}</h2>
      <p className="card__apply">
      {Note.session}
      </p>
      <p className="card__apply">
      {Note.time}
      </p>
      <p className="View_now">
        View &gt;
      </p>
    </div>
    </div>
    </Link>
  )
}

export default My_note_card




