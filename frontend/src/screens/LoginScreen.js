import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Col, Row } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../actions/userActions"
import Alert from "@mui/material/Alert"

function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }))
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(data))
  }

  return (
    <>
      <FormContainer>
        <Form className="form-body" onSubmit={submitHandler} autoComplete="off">
          {error && <Alert severity="error">{error}</Alert>}
          <h1 className="text-center">Log In</h1>
          <Row className="align-items-end">
            <Col sm={12} className="mb-3 pr-2">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={data.email}
                  className="rounded"
                  placeholder="Enter Email Address"
                  autoComplete="off"
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col sm={12} className="mb-0 pr-2">
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={data.password}
                  name="password"
                  className="rounded"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  autoComplete="new-password"
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4} sm={5} className="pt-3">
              {loading ? (
                <Loader />
              ) : (
                <Button type="submit" className="rounded" variant="primary">
                  Login
                </Button>
              )}
            </Col>
          </Row>
          <Row className="py-3">
            <Col>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  )
}

export default Login
