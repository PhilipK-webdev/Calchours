import React, { useState, useEffect } from "react";
import './App.css';
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "../src/components/nav/Nav"
import Footer from './components/footer/Footer';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import UserContext from "./context/UserContext"
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: "",
  });

  useEffect(() => {
    const checkedLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({ token, user: userRes.data });
      }
    };

    checkedLoggedIn();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <div className="row">
        <Router>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Nav />
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/register">
                <RegisterPage userData={userData} />
              </Route>
              <Route path="/login">
                <LoginPage userData={userData} setUserData={setUserData} />
              </Route>
              <Route path="/calendar">
                <CalendarPage userData={userData} />
              </Route>
            </Switch>
            <footer>
              <Footer />
            </footer>
          </UserContext.Provider>
        </Router>
      </div>
    </div >
  );
}

export default App;
