import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";
import Navbar from "./component/NavBar/Navbar";
// import Form from "./Component/Form/CreateForm/Form/Form";
import Home from "./page/Home";
import Login from "./page/Login";
// import ForgetPassword from "./Page/ForgetPassword";
// import Dashboard from "./Page/Dashboard";
// import ViewForm from "./Page/ViewForm";
// import UserView from "./Component/UserView/UserView";
// import UserData from "./Page/UserData";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgetPassword" element={<ForgetPassword />} />
        {authContextValue.loggedIn && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        <Route path="/dashboard/form/:id" element={<ViewForm />} />
        <Route path="/dashboard/form" element={<Form />} />
        {authContextValue.loggedIn && (
          <Route path="/dashboard/data/:id" element={<UserData />} />
        )} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
