const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: "Imagem é obrigatória" });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            imageUrl: req.file.filename,
            createdBy: req.user.id 
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: "Erro ao criar produto" });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ createdBy: req.user.id });
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: "Erro ao buscar produtos" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        if (product.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Não autorizado a editar este produto" });
        }

        const updateData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        };

        if (req.file) {
            if (product.imageUrl) {
                const oldImagePath = path.join(__dirname, '../uploads', product.imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.imageUrl = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ message: "Erro ao atualizar produto" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        if (product.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Não autorizado a excluir este produto" });
        }

        if (product.imageUrl) {
            const imagePath = path.join(__dirname, '../uploads', product.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(id);
        res.json({ message: "Produto removido com sucesso" });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ message: "Erro ao deletar produto" });
    }
};