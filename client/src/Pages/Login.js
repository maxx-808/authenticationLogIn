import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext.js";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [form, setForm] = useState();

  return <div className="page">
      <form onSubmit={}>
          <h1>Login</h1>
      </form>
  </div>;
};

export default Login;
