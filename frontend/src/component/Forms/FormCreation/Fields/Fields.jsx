import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../store/AuthContext";

import "./Fields.css";

export default function Fields(props) {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [mandate, setMandate] = useState("");
  const [value, setValue] = useState("DONE");
  const [disable, setDisable] = useState("");

  const authContextValue = useContext(AuthContext);

  const doneHandler = async (e) => {
    const fields = authContextValue.fields;
    if (value === "DONE") {
      // console.log("done clicked!!!!!!!")
      const fieldDetails = { fieldName, fieldType, mandate };
      // console.log(fieldDetails)
      authContextValue.setFields((prevState) => [...prevState, fieldDetails]);
      setValue("EDIT");
      console.log(fields);
      setDisable("disabled");
    } else {
      console.log("edit clicked!!!!!!!");
      setValue("DONE");
      setDisable("");
    }
    // console.log(props.fieldDisable)

    // if(disable==="disabled" && props.createForm==="clicked"){
    //     setDisable("")
    //     setFieldName("")
    //     setFieldType("")
    //     setMandate("")
    // }
  };
  return (
    <div className="flex">
      <div className="fieldName">
        <input
          type="text"
          id="fname"
          placeholder="Field Name"
          onChange={(e) => setFieldName(e.target.value)}
          value={fieldName}
          disabled={disable}
        />
      </div>
      <div className="fieldDataType">
        <select
          name="dataType"
          id="fDataType"
          onChange={(e) => setFieldType(e.target.value)}
          value={fieldType}
          disabled={disable}
          required
        >
          <option value="" hidden>
            Field Data Type
          </option>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="checkbox">Checkbox</option>
          <option value="file">File</option>
          <option value="radio">Radio</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="fieldMandate">
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <span htmlFor="">Mandatory Field?</span>
      </div>
      <div className="done" onClick={doneHandler}>
        {value}
      </div>
    </div>
  );
}
