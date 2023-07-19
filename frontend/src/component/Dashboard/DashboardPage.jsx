import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

import dashboardCSS from "./DashboardPage.module.css";

import Card from "../Card/Card";
import Form from "../Forms/NoticeCreation/Form";

export default function DashboardPage() {
  const [notice, setNotice] = useState(null);

  const authContextValue = useContext(AuthContext);

  const id = localStorage.getItem("id");
  var objectArray = [];

  useEffect(() => {
    const fetchNotice = async () => {
      const noticeF = await fetch("/api/notices");
      const noticeJson = await noticeF.json();
      for (var i = 0; i < noticeJson.length; i++) {
        for (var element in noticeJson[i]) {
          if (element === "id") {
            if (noticeJson[i][element] === id) {
              if (noticeF.ok) {
                objectArray.push(noticeJson[i]);
              }
            }
          }
        }
      }
      // console.log(objectArray)
      setNotice(objectArray);
    };
    fetchNotice();
  }, [notice]);

  authContextValue.setNotices(notice);
  // console.log(authContextValue.notices)
  // console.log(notice)

  return (
    <div className={dashboardCSS.dashboard}>
      <div className={dashboardCSS.notices}>
        {notice &&
          notice.map((data) => {
            return <Card key={data._id} element={data} />;
          })}
      </div>
      <Form />
    </div>
  );
}
