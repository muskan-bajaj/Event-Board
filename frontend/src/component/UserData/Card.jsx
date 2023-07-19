import React, { useEffect, useState } from "react";

import "./Card.css";

export default function Card(props) {
  const [keys, setKeys] = useState([]);
  const [length, setLength] = useState();
  //-3
  useEffect(() => {
    console.log(Object.keys(props.data).length);
    console.log(props.data);
    setKeys(Object.keys(props.data));
  }, []);

  useEffect(() => {
    ["_id", "eventName", "formID"].forEach((element) => {
      const index = keys.indexOf(element);
      if (index > -1) {
        keys.splice(index, 1);
      }
    });
    setLength(keys.length);
  }, [keys]);

  return (
    <div className="dataCard">
      {keys.map((element) => (
        <div className="cardElement" key={element}>
          <span className="fieldTitle">{element}</span>
          <br />
          <span className="fieldValue">{props.data[element]}</span>
        </div>
      ))}
    </div>
  );
}
