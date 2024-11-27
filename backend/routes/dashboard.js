const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/cliente", protect, (req, res) => {
    if (req.user.role !== "cliente") {
        return res.status(403).json({ message: "Acesso negado!" });
    }
    res.json({ message: "Bem-vindo ao Dashboard do Cliente!" });
});

router.get("/colaborador", protect, (req, res) => {
    if (req.user.role !== "colaborador") {
        return res.status(403).json({ message: "Acesso negado!" });
    }
    res.json({ message: "Bem-vindo ao Dashboard do Colaborador!" });
});

module.exports = router;
