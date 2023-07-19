import React, { useState, useEffect } from "react";
import homeCSS from "./HomeMain.module.css";

import Card from "../Card/Card";

export default function Notice() {
  const [notice, setNotice] = useState(null);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const fetchNotice = async () => {
      const noticeF = await fetch("/api/notices");
      const noticeJson = await noticeF.json();

      if (noticeF.ok) {
        setNotice(noticeJson);
      }
    };
    const array = [];
    const formExist = async () => {
      const data = await fetch("/api/form");
      const json = await data.json();

      for (var i = 0; i < json.length; i++) {
        array.push(json[i].noticeID);
      }
      setArray(array);
    };

    formExist();
    fetchNotice();
  }, []);

  return (
    <div className={homeCSS.background}>
      <div className={homeCSS.cardElementHome}>
        {notice &&
          notice.map((data, i) => {
            var button;
            if (array.includes(data._id)) {
              button = true;
            }
            return <Card key={data._id} element={data} form={button} />;
          })}
      </div>
    </div>
  );
}
