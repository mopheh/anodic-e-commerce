import React from "react"
import { Navbar, Nav } from "react-bootstrap"

function Footer() {
  return (
    <Navbar
      bg="light"
      className="px-5  foot py-2"
      variant="light"
      fixed="bottom"
    >
      <h6 className="mb-0">All Rights Reserved © 2022 Anodic store</h6>
      <Nav>
        <Nav.Link>Privacy Policy</Nav.Link>
        <Nav.Link>Returns & Exchanges</Nav.Link>
        <Nav.Link>Shipping & Delivery</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Footer
