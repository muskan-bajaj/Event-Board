import React from "react";

export default function Number(props) {
  return (
    <div>
      <input
        type="number"
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
