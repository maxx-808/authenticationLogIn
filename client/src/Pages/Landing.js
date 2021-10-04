import React, { useState, useContext, useEffect } from "react";
import Auth from "../components/Auth/Auth";
import "../App.css";

const Landing = () => {
  return (
    <div className="page">
      <Auth>
        <h1>Login Authenticator</h1>
        <p>
          This is a showcase of using light auth in creating a secure register
          and login system. When saving passwords into the database, it is
          hashed and encrypted to make sure if there is a breach, the password
          will not be able to be accessed.
        </p>
      </Auth>
    </div>
  );
};
export default Landing;
