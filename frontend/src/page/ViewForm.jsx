import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import UserView from "../component/UserView/UserView";

export default function ViewForm() {
  // const [notice, setNotice]=useState(null);

  const authContextValue = useContext(AuthContext);

  const id = localStorage.getItem("id");
  // var objectArray=[];

  // useEffect(()=>{
  const fetchNotice = async () => {
    const form = await fetch("/api/form");
    const formJson = await form.json();
    //   console.log(form)
    //   console.log(formJson)
    for (var i = 0; i < formJson.length; i++) {
      for (var element in formJson[i]) {
        // console.log(element)
        if (element === "noticeID") {
          if (formJson[i][element] === id) {
            //   if(noticeF.ok){
            // objectArray.push(noticeJson[i])
            //   }
          }
        }
      }
    }
    // console.log(objectArray)
    //   setNotice(objectArray)
  };
  fetchNotice();
  // },[notice])

  // authContextValue.setNotices(notice);
  return (
    <div>
      {/* {fetchNotice()} */}
      {/* <ViewForm */}
      <UserView />
    </div>
  );
}
