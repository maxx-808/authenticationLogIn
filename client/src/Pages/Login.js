import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [form, setForm] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        <h1 style={{ padding: "20px" }}>Login</h1>
        <label className="loginLabels">Email</label>
        <input
          style={{ color: "black", borderBottom: "1px solid grey" }}
          onChange={onChange}
          type="text"
          name="email"
        />
        <label className="loginLabels">Password</label>
        <input
          style={{ color: "black", borderBottom: "1px solid grey" }}
          onChange={onChange}
          type="password"
          name="password"
        />
        <input
          style={{
            marginLeft: "15px",
            backgroundColor: "lightGrey",
            borderRadius: "10px",
          }}
          type="submit"
          name="Login"
        />
      </form>
    </div>
  );
};

export default Login;
