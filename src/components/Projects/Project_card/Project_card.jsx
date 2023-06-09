import React from "react";
import "./Project_card.css";

import { UisFavorite } from "@iconscout/react-unicons-solid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";
const Project_card = (props ) => {
  
  const cookies = new Cookies();
  const { project } = props;
  return (
    <div className="Projects_card" key={props.index}>
      <div className="container">
        <div className="card">
          <div className="Points">
            {project.Points}
            <UisFavorite />
          </div>
          <div className="contentBx">
            <h2>{project.Project_name}</h2>
            <div className="Desc">{project.Details}</div>
              <div onClick={()=>{
                cookies.set('project', project.Project_name, { path: '/' })


              }}>
              <Link to="/Project_details">View Details </Link></div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project_card;
