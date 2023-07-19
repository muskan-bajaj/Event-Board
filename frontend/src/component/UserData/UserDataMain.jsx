import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";

export default function UserDataMain(props) {
  const [eventName, setEventName] = useState();
  const [data, setData] = useState([]);
  const [length, setLength] = useState();
  const redirect = useNavigate();

  useEffect(() => {
    const request = async () => {
      const response = await fetch(`/api/notices/${props.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setEventName(json.eventName);
    };

    request();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(`/api/formData/${eventName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      //   userData.push(json.data);
      setData([...json.data]);
    };

    getUserData();
    console.log(eventName);
  }, [eventName]);

  useEffect(() => {
    setLength(data.length);
  }, [data]);

  return (
    <div className="userDataPage">
      <div className="total">Total Registrations: {length}</div>
      <div className="elementCard">
        {data ? (
          data.map((elementData) => {
            return <Card data={elementData} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
