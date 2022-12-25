import React, { useState } from "react"
import { Form, Button, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckOutSteps"

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const navigate = useNavigate()
  const { shippingAddress } = cart

  if (!shippingAddress) {
    navigate("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }

  return (
    <Container className="my-5">
      <CheckoutSteps active="3" />
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <h1>Payment Method</h1>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
            </Col>
          </Form.Group>

          <Button type="submit" className="my-2 rounded" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default PaymentScreen
