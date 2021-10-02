import React, { useEffect, useContext } from "react";
import userContext from "../../Context/UserContext";
import { useHistory } from "react-router-dom";

const Auth = (props) => {
  const { userData } = useContext(userContext);
  const history = useHistory();
  useEffect(() => {
    if (userData.user) history.push("/home");
  }, [userData.user, history]);
  return <>{props.children}</>;
};
export default Auth;
