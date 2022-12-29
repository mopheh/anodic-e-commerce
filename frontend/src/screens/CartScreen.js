import React, { useEffect } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Container,
} from "react-bootstrap"
import { addToCart, removeFromCart } from "../actions/cartActions"
import Alert from "@mui/material/Alert"

const CartScreen = () => {
  const { id: productId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const qty = location.search ? Number(location.search.split("=")[1]) : 1
  const { pathname } = location
  console.log(pathname)
  ///
  function formatToCurrency(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping")
  }

  return (
    <Container className="my-3 mb-5 cart">
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Alert severity="info">
              Your cart is empty <Link to="/">Shop Now</Link>
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col lg={2} md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col lg={3} md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col lg={2} md={2}>
                      ₦{formatToCurrency(item.price)}
                    </Col>
                    <Col lg={3} md={3} sm={6} className="increment">
                      <div className="d-flex">
                        <Button
                          variant="dark"
                          size="sm"
                          className="rounded mr-3"
                          disabled={item.qty === 1}
                          onClick={() =>
                            dispatch(
                              addToCart(item.product, Number(item.qty - 1))
                            )
                          }
                        >
                          -
                        </Button>
                        <input
                          type="text"
                          value={item.qty}
                          readOnly
                          className="border-0 w-20 mx-auto text-center"
                        />
                        <Button
                          variant="dark"
                          size="sm"
                          className="rounded ml-3"
                          onClick={() =>
                            dispatch(
                              addToCart(item.product, Number(item.qty + 1))
                            )
                          }
                          disabled={item.qty === item.countInStock}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </Button>
                      </div>
                    </Col>
                    <Col md={1} sm={6}>
                      <Button
                        type="button"
                        variant="light"
                        className="rounded"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                ₦
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CartScreen
