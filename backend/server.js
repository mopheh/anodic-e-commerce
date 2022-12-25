import path from "path"
import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import colors from "colors"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import ordersRoute from "./routes/ordersRoute.js"
import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", ordersRoute)
app.use("/api/uploads", uploadRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.get("/", (req, res) => {
  res.send("API is running....")
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)