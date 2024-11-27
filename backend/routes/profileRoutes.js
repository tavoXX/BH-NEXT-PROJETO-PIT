// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const { editProfile } = require('../controllers/profileController');

// Rota para editar o perfil
router.put('/edit', editProfile);

module.exports = router;
