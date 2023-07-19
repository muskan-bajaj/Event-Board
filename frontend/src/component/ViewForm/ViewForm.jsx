import React, { useEffect, useState } from "react";
import FetchFields from "../Forms/FormCreation/FetchFields/FetchFields";

import "./ViewForm.css";
import { useParams } from "react-router-dom";

export default function ViewForm(props) {
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    for (var i = 0; i < props.formFields.length; i++) {
      userData[props.formFields[i].fieldName] = "";
    }
  }, []);

  const submitForm = async () => {
    userData["eventName"] = props.name;
    userData["formID"] = id;
    console.log(userData);
    const response = await fetch("/api/formData/", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    window.location.reload(true);

    // if (!response.ok) {
    //   setError(json.error);
    // }
    // if (response.ok) {
    //   setName("");
    //   setDes("");
    //   setDate("");
    //   setPoster("");
    //   setError(null);
    // }
  };
  return (
    <div className="viewForm">
      <div className="viewName">{props.name}</div>
      <div className="viewDes">{props.description}</div>
      <div className="viewField">
        {props.formFields.map((e) => (
          <FetchFields
            event={e}
            userData={userData}
            setUserData={setUserData}
          />
        ))}
      </div>
      <div className="viewSubmit">
        <button onClick={submitForm}>SUBMIT</button>
      </div>
    </div>
  );
}
