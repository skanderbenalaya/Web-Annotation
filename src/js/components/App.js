import React from "react";
import { Card, Tab, Tabs } from "@blueprintjs/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "./Loader";
import Login from "../components/Auth/LoginScreen";
import Register from "../components/Auth/RegisterScreen";
import Welcome from "../components/Auth/Welcome";
import { Provider } from "react-redux";
import store from "../store/store";

function App() {
  const [currentTab, setCurrentTab] = useState("login");
  const [userContext, setUserContext] = useContext(UserContext);
  // console.log("App Context ", userContext);
  const verifyUser = useCallback(() => {
    fetch("http://localhost:3000/api/auth/refreshtoken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      // console.log(response);
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  return userContext.token === null ? (
    <Card elevation="1" className="Panel">
      <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
        <Tab
          id="login"
          title="Login"
          panel={<Login />}
          style={{ outline: "none" }}
        />
        <Tab
          id="register"
          title="Register"
          panel={<Register />}
          style={{ outline: "none" }}
        />
        <Tabs.Expander />
      </Tabs>
    </Card>
  ) : userContext.token ? (
    <Provider store={store}>
      <Welcome />
    </Provider>
  ) : (
    <Loader />
  );
}

export default App;
