import React, { useEffect } from "react"
import ItemCarousel from "../components/Carousel"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import { Pagination } from "@mui/material"
import { listProducts } from "../actions/productActions"
import Loader from "../components/Loader"
import Alert from "@mui/material/Alert"
function HomeScreen() {
  const dispatch = useDispatch()
  const params = useParams()
  const keyword = params.keyword
  const navigate = useNavigate()
  const pageNumber = params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  useEffect(() => {
    dispatch(listProducts("", pageNumber))
  }, [dispatch, pageNumber])

  const handleChange = (event, value) => {
    keyword
      ? navigate(`/search/${keyword}/page/${value}`)
      : navigate(`/page/${value}`)
  }
  return (
    <>
      <ItemCarousel />
      <Container className="mt-4 mb-5 pb-3">
        <h1>
          <span className="d-block" style={{ color: "#b2b2b2" }}>
            Top
          </span>
          Products
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} section="home" />
                </Col>
              ))}
            </Row>
            <Pagination
              count={Number(pages)}
              className="pagination"
              color="primary"
              onChange={handleChange}
              page={Number(page)}
            />
          </>
        )}
      </Container>
    </>
  )
}

export default HomeScreen
