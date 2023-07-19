import React, { useEffect, useState } from "react";
import ViewForm from "../ViewForm/ViewForm";

export default function UserView() {
  const id = localStorage.getItem("noticeID");
  const [objectArray, setObjectArray] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      const fetchForm = await fetch("/api/form");
      const json = await fetchForm.json();
      for (var i = 0; i < json.length; i++) {
        for (var element in json[i]) {
          if (element === "noticeID") {
            if (json[i][element] === id) {
              if (fetchForm.ok) {
                setObjectArray(json[i]);
              }
            }
          }
        }
      }
    };
    fetchForm();
  }, []);

  // console.log(objectArray)

  return (
    <div>
      {objectArray.length !== 0 && (
        <ViewForm
          name={objectArray.formName}
          description={objectArray.formDes}
          formFields={objectArray.fields}
        />
      )}
    </div>
  );
}
