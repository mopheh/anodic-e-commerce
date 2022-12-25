import React from "react"
import { Row, Col, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"

function Header() {
  const wishlist = useSelector((state) => state.wishlist)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      <div className="top-bar">
        <div className="top-container">
          <Row className="py-2">
            <Col>
              <ul>
                <li className="border-right pr-3">
                  <a href="tel:+2349013795693" className="text-white">
                    <i className="fas fa-phone-alt"></i>+234-901-319-5693
                  </a>
                </li>
                <li className="pl-3">
                  <a href="mailto:support@gmail.com" className="text-white">
                    <i className="fas fa-envelope"></i> support@gmail.com
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="icons">
              <ul>
                <li>
                  <i className="fab fa-facebook-f"></i>
                </li>
                <li>
                  <i className="fab fa-instagram"></i>
                </li>
                <li>
                  <i className="fab fa-twitter"></i>
                </li>
                <li>
                  <i className="fab fa-telegram"></i>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
      <header>
        <Navbar bg="light" className="px-5" variant="light" collapseOnSelect>
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="pl-5">
                <LinkContainer to="/collections/games">
                  <Nav.Link>Games</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/collections/computers">
                  <Nav.Link>Computers</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/collections/tv">
                  <Nav.Link>TV & AV</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/collections/home-appliances">
                  <Nav.Link>Home Appliances</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/collections/phones">
                  <Nav.Link>Phones</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            <LinkContainer to="/">
              <Navbar.Brand className="mx-auto head">anodic.</Navbar.Brand>
            </LinkContainer>
            <Nav className="ml-auto right-bar pr-5">
              <LinkContainer to="/search">
                <Nav.Link>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/wishlist">
                <Nav.Link className="position-relative">
                  <i className="fa-regular fa-heart"></i>
                  {wishlist.length > 0 && (
                    <span className="bg-danger notification-sign"></span>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link className="position-relative">
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cartItems.length > 0 && (
                    <span className="bg-danger notification-sign"></span>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={userInfo ? `/profile` : "/login"}>
                <Nav.Link>
                  <i className="fa-regular fa-user"></i>
                </Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="admin" id="adminmenu">
                  <LinkContainer to={`/admin/userlist`}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </>
        </Navbar>
      </header>
    </>
  )
}

export default Header
