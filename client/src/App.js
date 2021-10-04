import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import UserContext from "./Context/UserContext";

import Login from "./Pages/Login";

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });

  const loginCheck = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
    }
    try {
      const userRes = await axios.get("/api/users", {
        headers: { "x-auth-token": token },
      });
    } catch (err) {
      console.log("User must Login");
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Route exact path="/" component={Login} />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
