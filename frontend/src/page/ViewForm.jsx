import React, { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import UserView from "../component/UserView/UserView";
import Loading from "../animation/Loading";

export default function ViewForm() {
  const authContextValue = useContext(AuthContext);
  const id = localStorage.getItem("id");
  const [load, setLoad] = useState(true);

  const fetchNotice = async () => {
    const form = await fetch("/api/form");
    const formJson = await form.json();
    for (var i = 0; i < formJson.length; i++) {
      for (var element in formJson[i]) {
        if (element === "noticeID") {
          if (formJson[i][element] === id) {
          }
        }
      }
    }
    setLoad(false);
  };
  fetchNotice();

  return <div>{load ? <Loading /> : <UserView />}</div>;
}
