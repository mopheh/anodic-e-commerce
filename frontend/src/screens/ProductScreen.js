import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Alert from "@mui/material/Alert"
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions"
import { addToWishlist, removeFromWishlist } from "../actions/wishlistAction"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
const ProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [qty, setQty] = useState(Number(1))
  const [check, setCheck] = useState(false)
  const wishlist = useSelector((state) => state.wishlist)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { id } = useParams()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert("Review Added")
      setRating(0)
      setComment("")
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    wishlist.map((item) => {
      if (item.product === id) {
        setCheck(true)
      }
      return ""
    })
    dispatch(listProductDetails(id))

    //eslint-disable-next-line
  }, [dispatch, id, successProductReview])

  function formatToCurrency(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const sumbitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <section className=" px-10 mb-5">
        <Link className="btn btn-light my-3 mx-5" to="/">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Row className="px-5">
              <Col md={4}>
                <Image src={`${product.image}`} alt={product.name} fluid />
              </Col>
              <Col md={5}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-flex align-items-center">
                      <div
                        className={`wishlist-screen ${check && " bg-danger"} ${
                          !check && " border border-dark"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          setCheck(!check)
                          check
                            ? dispatch(removeFromWishlist(product._id))
                            : dispatch(addToWishlist(product._id))
                        }}
                      >
                        {check ? (
                          <i
                            className="fa-solid fa-heart"
                            style={{ color: "#fff" }}
                          ></i>
                        ) : (
                          <i className="fa-regular fa-heart"></i>
                        )}
                      </div>
                      <p className="ml-2 mb-0">
                        {check ? "Remove from Wishlist" : "Add to Wishlist"}
                      </p>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>
                            ₦{product.price && formatToCurrency(product.price)}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <div className="d-flex">
                              <Button
                                variant="dark"
                                size="sm"
                                className="rounded mr-3"
                                disabled={qty === 1}
                                onClick={() => setQty(qty - 1)}
                              >
                                -
                              </Button>
                              <input
                                type="text"
                                value={qty}
                                readOnly
                                className="border-0 w-20 mx-auto text-center"
                              />
                              <Button
                                variant="dark"
                                size="sm"
                                className="rounded ml-3"
                                onClick={() => setQty(qty + 1)}
                                disabled={qty === product.countInStock}
                              >
                                <i className="fa-solid fa-plus"></i>
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        onClick={addToCartHandler}
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && (
                  <Alert severity="info">No Reviews Yet</Alert>
                )}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p> {review.comment} </p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2> Write a Customer Review</h2>
                    {errorProductReview && (
                      <Alert severity="error">{errorProductReview}</Alert>
                    )}
                    {userInfo ? (
                      <Form onSubmit={sumbitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select....</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-2" controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            value={comment}
                            rows="3"
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type="submit"
                          className="rounded mt-3"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Alert severity="info">
                        {" "}
                        Please <Link to="/login"> sign in</Link> to write a
                        review{" "}
                      </Alert>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </section>
    </>
  )
}

export default ProductScreen
