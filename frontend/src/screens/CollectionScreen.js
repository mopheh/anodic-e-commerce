import React, { useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/Product"
import Alert from "@mui/material/Alert"
import BreadCrumbs from "../components/BreadCrumbs"
import { listCollectionProducts } from "../actions/productActions"
import Loader from "../components/Loader"

function CollectionScreen() {
  const dispatch = useDispatch()
  const { collection } = useParams()

  const productCollection = useSelector((state) => state.productCollection)
  const { loading, products, error } = productCollection

  useEffect(() => {
    const name = collection.charAt(0).toUpperCase() + collection.slice(1)
    dispatch(listCollectionProducts(name))
  }, [collection, dispatch])

  return (
    <Container>
      <div className="py-5 wishlist-header mb-3 border-bottom text-center">
        <h1 className="text-capitalize"> {collection} </h1>
        <BreadCrumbs collection={collection} />
      </div>
      {products.length === 0 ? (
        <Alert severity="info">
          This collection is empty <Link to="/">Go Back</Link>
        </Alert>
      ) : (
        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <Alert severity="error">{error} </Alert>
          ) : (
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))
          )}
        </Row>
      )}
    </Container>
  )
}

export default CollectionScreen
