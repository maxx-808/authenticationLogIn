import logo from "./logo.svg";
import "./App.css";
import UserContext from "./Context/UserContext";

import Login from "./Pages/Login";

function App() {
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
