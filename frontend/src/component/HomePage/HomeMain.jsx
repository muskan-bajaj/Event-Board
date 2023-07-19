import React, { useState, useEffect } from "react";
import homeCSS from "./HomeMain.module.css";

import Card from "../Card/Card";

export default function Notice() {
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      const noticeF = await fetch("/api/notices");
      const noticeJson = await noticeF.json();

      if (noticeF.ok) {
        setNotice(noticeJson);
      }
    };
    fetchNotice();
  }, []);

  return (
    <div className={homeCSS.background}>
      <div className={homeCSS.cardElementHome}>
        {notice &&
          notice.map((data) => {
            return <Card key={data._id} element={data} />;
          })}
      </div>
    </div>
  );
}
