import React from "react";
// import Card from "../component/UserData/Card";
import { useParams } from "react-router-dom";
import UserDataMain from "../component/UserData/UserDataMain";

export default function UserData() {
  const { id } = useParams();
  return (
    <div>
      <UserDataMain id={id} />
    </div>
  );
}
