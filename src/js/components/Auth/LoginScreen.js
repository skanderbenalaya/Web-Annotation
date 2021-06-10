import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "../../../index.css";
const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);
  // console.log("Login Context ", userContext);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        // console.log(response.ok);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          // console.log(data);
          setUserContext((oldValues) => {
            console.log("Login Context ", userContext);
            return { ...oldValues, token: data.token };
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };
  return (
    <React.Fragment>
      {error && <Callout intent="danger">{error}</Callout>}
      <form onSubmit={formSubmitHandler} className="auth-form">
        <FormGroup label="Username" labelFor="username">
          <InputGroup
            id="username"
            placeholder="Username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          disabled={isSubmitting}
          text={`${isSubmitting ? "Signing In" : "Sign In"}`}
          fill
          type="submit"
        />
      </form>
    </React.Fragment>
  );
};

export default Login;
