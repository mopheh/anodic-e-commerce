import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Product from "../components/Product"
import Alert from "@mui/material/Alert"
import BreadCrumbs from "../components/BreadCrumbs"

function WishlistScreen() {
  const wishlist = useSelector((state) => state.wishlist)

  return (
    <Container>
      <div className="py-5 wishlist-header mb-3 border-bottom text-center">
        <h1> Wishlist </h1>
        <BreadCrumbs wishlist={true} />
      </div>
      {wishlist.length === 0 ? (
        <Alert severity="info">
          Your wishlist is empty <Link to="/">Go Back</Link>
        </Alert>
      ) : (
        <Row className="mb-5">
          {wishlist.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} section="wishlist" />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default WishlistScreen
