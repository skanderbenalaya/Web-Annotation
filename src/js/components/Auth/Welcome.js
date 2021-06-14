import { Button, Card } from "@blueprintjs/core";
import React, { useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Loader from "../../components/Loader";
import MainWindow from "../MainWindow";
import px2vw from "../../utils/px2vw";
import "./Welcome.css";
import { useSelector, useDispatch } from "react-redux";
import { UnlockQuestion } from "../../store/actions/questionActions";

const Welcome = () => {
  const _id = useSelector((state) => state.question_state.question_data._id);
  // console.log(_id);
  const dispatch = useDispatch();
  const [userContext, setUserContext] = useContext(UserContext);
  //   console.log("Refresh Context ", userContext);
  const fetchUserDetails = useCallback(() => {
    fetch("https://localhost:3000/api/auth/user", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          //   console.log("details ", data);
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload();
        } else {
          //   console.log("Refresh");
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  //   const refetchHandler = () => {
  //     // set details to undefined so that spinner will be displayed and
  //     // fetchUserDetails will be invoked from useEffect
  //     setUserContext((oldValues) => {
  //       return { ...oldValues, details: undefined };
  //     });
  //   };

  const logoutHandler = () => {
    fetch("http://localhost:3000/api/auth/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined, token: null };
      });
      window.localStorage.setItem("logout", Date.now());
      dispatch(UnlockQuestion(_id));
      console.log("disconnected ", _id);
    });
  };

  return userContext.details === null ? (
    "Error Loading User details"
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <React.Fragment>
      <Card elevation="1" style={{ padding: "10px" }}>
        <div
          className="user-details"
          style={{ marginLeft: `${px2vw(30)}`, fontSize: "1.3em" }}
        >
          Welcome&nbsp;
          <strong>{userContext.details.username}</strong>
          <span className="logout-span">
            <Button
              text="Logout"
              onClick={logoutHandler}
              outlined
              intent="Danger"
              className="logout-button"
            />
          </span>
        </div>
      </Card>
      <MainWindow username={userContext.details.username} />
    </React.Fragment>
  );
};

export default Welcome;
