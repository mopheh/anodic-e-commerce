import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import "./App.css"
import HomeScreen from "./screens/HomeScreen"
import Footer from "./components/Footer"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import WishlistScreen from "./screens/WishlistScreen"
import Login from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import PaymentScreen from "./screens/PaymentScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import CollectionScreen from "./screens/CollectionScreen"
import OrderListScreen from "./screens/OrderListScreen"

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route
            path="/collections/:collection"
            element={<CollectionScreen />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/wishlist" element={<WishlistScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
          <Route
            path="/admin/productlist"
            element={<ProductListScreen />}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            element={<ProductListScreen />}
            exact
          />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
