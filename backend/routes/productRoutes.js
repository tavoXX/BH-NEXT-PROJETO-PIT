const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});
const upload = multer({ storage });
router.post("/", authMiddleware, upload.single("image"), productController.createProduct);
router.get("/", authMiddleware, productController.getProducts);
router.put("/:id", authMiddleware, upload.single("image"), productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);
module.exports = router;