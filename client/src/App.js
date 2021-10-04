import logo from "./logo.svg";
import "./App.css";
import UserContext from "./Context/UserContext";

import Login from "./Pages/Login";
import { TokenExpiredError } from "jsonwebtoken";

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
    checkLoggedIn();
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
