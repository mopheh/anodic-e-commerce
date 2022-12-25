import express from "express"
import {
  authUser,
  deleteUser,
  getUserDetails,
  getUsers,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js"
import { admin, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.route("/login").post(authUser)
router.route("/:id").delete(protect, deleteUser)
router
  .route("/profile")
  .get(protect, getUserDetails)
  .put(protect, updateUserProfile)

export default router
