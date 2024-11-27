const express = require("express");
const { loginUser, registerUser, getUserInfo, editProfile, refreshToken } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/refresh-token", refreshToken);  // Nova rota para o refresh token

router.get("/user-info", protect, getUserInfo);

router.put("/profile", protect, editProfile);

module.exports = router;
