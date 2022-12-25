import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
import { addToWishlist, removeFromWishlist } from "../actions/wishlistAction"

const Product = ({ product, section }) => {
  const [check, setCheck] = useState(false)
  const wishlist = useSelector((state) => state.wishlist)

  useEffect(() => {
    wishlist.map((item) => {
      if (item.product === product._id) {
        setCheck(true)
      }
      return ""
    })
  }, [wishlist, product])
  function formatToCurrency(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }
  const dispatch = useDispatch()
  if (section === "wishlist") {
    product._id = product.product
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Link className="cover" to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          className="rounded-lg"
          variant="top"
          fluid
        />
        {section === "home" && (
          <div
            className={`wishlist ${check && " bg-danger"}`}
            onClick={(e) => {
              e.preventDefault()
              setCheck(!check)
              check
                ? dispatch(removeFromWishlist(product._id))
                : dispatch(addToWishlist(product._id))
            }}
          >
            {check ? (
              <i className="fa-solid fa-heart" style={{ color: "#fff" }}></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </div>
        )}
        {section === "wishlist" && (
          <div
            className={`wishlist-section`}
            onClick={(e) => {
              e.preventDefault()
              dispatch(removeFromWishlist(product._id))
            }}
          >
            <i className="fa-solid fa-x"></i>
          </div>
        )}
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h5">₦{formatToCurrency(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
