import React from "react"
import NavBar from "../components/navBar"
import Jumbotron from "react-bootstrap/Jumbotron"
import { Link } from "gatsby"

export default function PurchaseSuccess() {
  return (
    <div>
      <NavBar />

      <Jumbotron className="jumbotron">
        <h1>We have recieved your order!</h1>
        <p>
          <Link className="homePageLink" to="/">
            Click here{" "}
          </Link>{" "}
          to go back to the home page...
        </p>
      </Jumbotron>
    </div>
  )
}
