import React from "react"
import { Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import collections from "../data/products"

function ItemCarousel() {
  return (
    <Carousel indicators={false} controls={false}>
      {collections.map((collection, index) => (
        <Carousel.Item key={index} interval={2500}>
          <img
            className="d-block w-80 ml-auto mr-5 position-relative"
            src={collection.image}
            alt={collection.title}
            fluid
          />
          <Carousel.Caption className="position-absolute">
            <h3> {collection.title}</h3>
            <p>{collection.description}</p>
            <Link
              to={`/collections/${collection.collection}`}
              className=" pb-1"
            >
              Shop Now
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ItemCarousel
