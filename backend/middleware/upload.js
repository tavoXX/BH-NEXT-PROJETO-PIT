const multer = require('multer');
const path = require('path');

// Definindo onde e como as imagens serão salvas
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/logos'); // Caminho onde a imagem será salva
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Adicionando timestamp no nome do arquivo
    }
});

// Função para validar se o arquivo é uma imagem
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Apenas arquivos de imagem são permitidos.'));
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
