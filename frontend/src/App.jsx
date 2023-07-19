import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";
import Navbar from "./component/NavBar/Navbar";
import Form from "./page/AdminForm";
import Home from "./page/Home";
import Login from "./page/Login";
// import ForgetPassword from "./Page/ForgetPassword";
import Dashboard from "./page/Dashboard";
import ViewForm from "./page/ViewForm";
import UserData from "./page/UserData";

function App() {
  const authContextValue = useContext(AuthContext);
  authContextValue.setLoggedIn(localStorage.getItem("id") ? true : false);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgetPassword" element={<ForgetPassword />} /> */}
        {authContextValue.loggedIn && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        <Route path="/dashboard/form/:id" element={<ViewForm />} />
        {authContextValue.loggedIn && (
          <Route path="/dashboard/form" element={<Form />} />
        )}
        {authContextValue.loggedIn && (
          <Route path="/dashboard/data/:id" element={<UserData />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
