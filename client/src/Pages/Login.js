import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [form, setForm] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const submitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", form);

      setUserData({
        token: data.token,
        user: data.user,
      });

      localStorage.setItem("auth-token", data.token);
      localStorage.setItem("id", data.user.id);

      history.push("/");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="page">
      <form onSubmit={submitLoginForm}>
        <h1>Login</h1>
      </form>
    </div>
  );
};

export default Login;
