import express from "express";

import { 
  loginUser, 
  logoutUser,
  registerUser, 
  forgotPassword, 
  resetPassword,
  checkAuthStatus 
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logoutUser);
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", checkAuthStatus);

export default router