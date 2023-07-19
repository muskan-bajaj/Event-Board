import React from "react";

export default function Date(props) {
  return (
    <div>
      <input
        type="date"
        style={{
          backgroundColor: "rgba(28, 28, 28, 1)",
          border: "none",
          color: "white",
          padding: "10px",
        }}
        onChange={(e) => {
          props.setUserData({
            ...props.userData,
            [`${props.fieldName}`]: e.target.value,
          });
        }}
        value={props.setUserData[props.fieldName]}
      />
    </div>
  );
}
