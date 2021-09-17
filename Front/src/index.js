import React from "react"
import ReactDOM from "react-dom"
import App from "./js/components/App"
import { UserProvider } from "./js/context/UserContext"

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
)