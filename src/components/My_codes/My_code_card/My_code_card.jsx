import React, { useEffect } from 'react'
import './My_code_card.css'
import { UilArrow } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
const My_code_card = (props) => {
  const cookies = new Cookies();
  const {Code} = props
  useEffect(() => {

    console.log(props)
  }, [])
  
  return (
    <Link to="/Code_detail">
    <div className="My_code_card" onClick={()=>{
      
      cookies.set('Code', Code.code_title, { path: '/' })
      cookies.set('html', Code.html, { path: '/' })
      cookies.set('css', Code.css, { path: '/' })
      cookies.set('js', Code.js, { path: '/' })
    }} key ={props.index}>
<div className="card_ card_">
      <h2 className="card__title">{Code.code_title}</h2>
      <p className="card__apply">
        {Code.session}
      </p>
      <p className="View_now">
        {Code.time}
      </p>
      <p> <UilArrow/> </p>
      <p className="card__apply">
        View &gt;
      </p>
    </div>
    </div>
    </Link>
  )
}

export default My_code_card