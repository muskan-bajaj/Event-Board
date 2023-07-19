import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../store/AuthContext";
import Fields from "../Fields/Fields";
// import ViewForm from '../../../ViewForm/ViewForm'

import formCSS from "./Form.module.css";
// import PreviousForm from '../../../PreviousForm/PreviousForm'

export default function Form() {
  const [fieldNo, setFieldNo] = useState([[1]]);
  const [formName, setFormName] = useState("");
  const [formDes, setFormDes] = useState("");
  const [error, setError] = useState(null);

  const [modal, setModal] = useState(formCSS.modalInactive);

  const authContextValue = useContext(AuthContext);
  let fields = authContextValue.fields;
  const noticeArray = authContextValue.notices;

  var noticeID;

  const handleAddField = async () => {
    setFieldNo((prevState) => [...prevState, [1]]);
  };

  useEffect(() => {
    console.log(fieldNo);
  }, [fieldNo]);

  const sumbitFunction = async (e) => {
    const userID = localStorage.getItem("id");
    for (var i = 0; i < noticeArray.length; i++) {
      for (var element in noticeArray[i]) {
        if (element === "eventName") {
          if (noticeArray[i][element] === formName) {
            noticeID = noticeArray[i]["_id"];
          }
        }
      }
    }
    const formDetails = { userID, noticeID, formName, formDes, fields };
    const response = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(formDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setFormName("");
      setFormDes("");
      setError(null);
    }
  };

  const confirm = async (e) => {
    const userID = localStorage.getItem("id");
    for (var i = 0; i < noticeArray.length; i++) {
      for (var element in noticeArray[i]) {
        if (element === "eventName") {
          if (noticeArray[i][element] === formName) {
            noticeID = noticeArray[i]["_id"];
          }
        }
      }
    }
    const formDetails = { userID, noticeID, formName, formDes, fields };
    const response = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(formDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setFormName("");
      setFormDes("");
      setError(null);
    }

    setModal(formCSS.modalInactive);
  };

  const previewHandler = async (e) => {
    setModal(formCSS.modalActive);
  };

  const cross = async (e) => {
    setModal(formCSS.modalInactive);
  };

  return (
    <>
      <div className={formCSS.registrationForm}>
        <div className={formCSS.formName}>Create Form</div>
        <div className={formCSS.FormHeadingFields}>
          <div className={formCSS.formTitle}>
            <select
              required
              name="eventType"
              id={formCSS.fTitle}
              onChange={(e) => setFormName(e.target.value)}
              value={formName}
            >
              <option value="" hidden>
                Form Title
              </option>
              {noticeArray.map((data) => (
                <option value={data.eventName}>{data.eventName}</option>
              ))}
            </select>
          </div>
          <div className={formCSS.formDescription}>
            <input
              type="text"
              id={formCSS.fDescription}
              placeholder="Form Description"
              onChange={(e) => setFormDes(e.target.value)}
              value={formDes}
            />
          </div>
        </div>
        <div className={formCSS.formFields}>
          {fieldNo.map((e) => (
            <Fields />
          ))}
          <div className={formCSS.addField}>
            <button className={formCSS.AF} onClick={handleAddField}>
              + ADD FIELD
            </button>
          </div>
        </div>
        <div className={formCSS.createFormButton}>
          <button onClick={previewHandler}>Preview Form</button>
          <button onClick={sumbitFunction}>Create Form</button>
        </div>
      </div>

      <div className={modal}>
        <div className={formCSS.overlay}></div>
        <div className={formCSS.modal}>
          {/* <ViewForm name={formName} description={formDes} formFields={fields} /> */}
          <button onClick={cross}>X</button>
          <button onClick={confirm} className={formCSS.formConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
