import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./MainPage.css";
import Loading from "../../animation/Loading";
// import { useNavigate } from "react-router-dom";

export default function UserDataMain(props) {
  const [eventName, setEventName] = useState();
  const [data, setData] = useState([]);
  const [length, setLength] = useState();
  const [load, setLoad] = useState(true);
  // const redirect = useNavigate();

  useEffect(() => {
    setLoad(true);
    const request = async () => {
      const response = await fetch(`/api/notices/${props.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setEventName(json.eventName);
      setLoad(false);
    };
    request();
  }, []);

  useEffect(() => {
    setLoad(true);
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
      setLoad(false);
    };
    getUserData();
  }, [eventName]);

  useEffect(() => {
    setLoad(true);
    setLength(data.length);
    setLoad(false);
  }, [data]);

  return (
    <div className="userDataPage">
      {load ? (
        <Loading width="400" height="400" />
      ) : data.length === 0 ? (
        <>
          <div className="total">No Registrations Yet!</div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
