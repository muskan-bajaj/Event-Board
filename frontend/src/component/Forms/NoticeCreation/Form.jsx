import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import { AuthContext } from '../Context/Context'

import formCSS from "./Form.module.css";

export default function Form() {
  const [eventName, setName] = useState("");
  const [eventDes, setDes] = useState("");
  const [date, setDate] = useState(new Date());
  const [poster, setPoster] = useState("");
  const [error, setError] = useState(null);

  // const authContextValue=createContext(AuthContext);
  // const id=authContextValue.userID

  const sumbitFunction = async (e) => {
    // e.preventDefault()
    const id = localStorage.getItem("id");
    const notice = { eventName, eventDes, date, poster, id };
    console.log(notice);
    const response = await fetch("/api/notices", {
      method: "POST",
      body: JSON.stringify(notice),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setDes("");
      setDate("");
      setPoster("");
      setError(null);
    }
  };

  return (
    <div className={formCSS.form}>
      <div className={formCSS.formHeading}>Create Event</div>
      <div className={formCSS.inputs}>
        <div className={formCSS.eventNameF}>
          <input
            type="text"
            placeholder="Event name"
            onChange={(e) => setName(e.target.value)}
            value={eventName}
          />
        </div>
        <div className={formCSS.eventDesF}>
          <input
            type="text"
            placeholder="Event Description"
            onChange={(e) => setDes(e.target.value)}
            value={eventDes}
          />
        </div>
        <div className={formCSS.posterF}>
          <input
            type="url"
            placeholder="Event Poster Link"
            onChange={(e) => setPoster(e.target.value)}
            value={poster}
          />
        </div>
        <div className={formCSS.dateF}>
          <DatePicker
            dateFormat="dd-mm-yy"
            selected={date}
            onChange={(e) => setDate(e)}
          />
        </div>
      </div>
      <button className={formCSS.createNotice} onClick={sumbitFunction}>
        Create Event
      </button>
      {error && <div className={formCSS.loginError}>{error}</div>}
    </div>
  );
}
