import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js"
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getCategory,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js"
////

const router = express.Router()
router.route("/").get(getProducts).post(protect, admin, createProduct)
router.route("/:collection/items").get(getCategory)
router.route("/:id/reviews").post(protect, createProductReview)
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
export default router
