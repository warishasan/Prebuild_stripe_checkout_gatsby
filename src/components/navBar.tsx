import React from "react"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "gatsby"

export default function NavBar() {
  return (
    <div>
      <Navbar className="navbar">
        <Navbar.Brand>
          <Link className="navbarLink" to="/">
            {" "}
            Stark Store
          </Link>
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}
