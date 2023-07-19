import React, { useContext } from "react";
// import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
// import { Link, generatePath, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";

import cardCSS from "./Card.module.css";

export default function Card(props) {
  const redirect = useNavigate();
  const id = props.element._id;

  const authContextValue = useContext(AuthContext);

  const fetchForm = async () => {
    redirect(`/dashboard/form/${id}`);
    localStorage.setItem("noticeID", id);
  };

  const data = async () => {
    redirect(`/dashboard/data/${id}`);
  };

  return (
    <div className={cardCSS.card}>
      <div className={cardCSS.poster}>
        <img
          className={cardCSS.posterImage}
          src={props.element.poster}
          alt=""
        />
      </div>
      <div className={cardCSS.content}>
        <div className={cardCSS.date}>{props.element.date}</div>
        <div className={cardCSS.description}>
          <div className={cardCSS.eventName}>{props.element.eventName}</div>
          <div className={cardCSS.eventDes}>{props.element.eventDes}</div>
        </div>
        <div className={cardCSS.button}>
          <button className={cardCSS.fillForm} onClick={fetchForm}>
            FORM
          </button>
          {authContextValue.loggedIn ? (
            <button className={cardCSS.fillForm} onClick={data}>
              DATA
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
