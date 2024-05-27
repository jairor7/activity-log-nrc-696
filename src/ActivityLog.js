import { Redirect, Route, Switch } from "wouter";
import "./activityLog.css";
import Home from "./sections/dashboard/home/Home";
import Login from "./sections/login/Login";
import { useState } from "react";
import { LoginContext } from "./LoginContext";

function ActivityLog() {
  const [loginInfo, setLoginInfo] = useState({
    isLoggedIn: false,
    userInfo: {
      name: undefined,
      activities: [],
    },
  });
  const { isLoggedIn } = loginInfo;
  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      <div className="activity-log-container">
        <Switch>
          {!isLoggedIn ? (
            <>
              <Route path="/login">
                <Login />
              </Route>
              <Route>
                <Redirect to="/login" />
              </Route>
            </>
          ) : (
            <>
              <Route path="/home">
                <Home />
              </Route>
              <Route>
                <Redirect to="/home" />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </LoginContext.Provider>
  );
}

export default ActivityLog;
