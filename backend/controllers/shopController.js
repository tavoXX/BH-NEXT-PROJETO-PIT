const axios = require("axios");
const Shop = require("../models/Shop");

const registerShop = async (req, res) => {
    const { name, address } = req.body;

    if (!name || !address || !req.file) {
        return res.status(400).json({ message: "Nome, endereço e logo são obrigatórios." });
    }

    try {
        const newShop = new Shop({
            name,
            address,
            logo: req.file.path, 
        });

        await newShop.save();
        res.status(201).json(newShop);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao registrar loja. Tente novamente." });
    }
};

const getShops = async (req, res) => {
    try {
        const shops = await Shop.find(); 
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        const shopsWithCoords = await Promise.all(
            shops.map(async (shop) => {
                if (!shop.latitude || !shop.longitude) {
                    const response = await axios.get(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(shop.address)}&key=${apiKey}`
                    );
                    const location = response.data.results[0]?.geometry.location;

                    if (location) {
                        shop.latitude = location.lat;
                        shop.longitude = location.lng;
                        await shop.save();
                    }
                }
                return shop;
            })
        );

        return res.status(200).json(shopsWithCoords);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao obter lojas. Tente novamente." });
    }
};

module.exports = {
    registerShop,
    getShops,
};
