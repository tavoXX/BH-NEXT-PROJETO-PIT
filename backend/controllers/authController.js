const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Função de registro de usuário
const registerUser = async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Usuário com este e-mail já existe." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: "Usuário registrado com sucesso." });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message });
    }
};

// Função de login de usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "E-mail ou senha inválidos." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "E-mail ou senha inválidos." });
        }

        const accessToken = jwt.sign(
            { id: user._id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Gerar o refresh token
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }  // O refresh token expira em 7 dias
        );

        res.status(200).json({
            message: "Login realizado com sucesso.",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ message: "Erro ao fazer login.", error: error.message });
    }
};

// Função para refresh do token
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token ausente." });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }  // Novo access token válido por 1 hora
        );

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Erro ao verificar o refresh token:", error);
        res.status(401).json({ message: "Refresh token inválido ou expirado." });
    }
};

// Função para obter as informações do usuário
const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter informações do usuário.", error: error.message });
    }
};

// Função para editar o perfil do usuário
const editProfile = async (req, res) => {
    const { name, email, password, logo, product_type, location, birth_date, profile_picture } = req.body;

    try {
        const user = await User.findById(req.user.id); // Acessando o ID do usuário a partir de req.user
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Atualizar os dados gerais do perfil
        if (name) user.name = name;
        if (email) user.email = email;

        // Atualizar a senha se fornecida
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Atualizar outras informações do perfil
        if (logo) user.logo = logo;
        if (product_type) user.product_type = product_type;
        if (location) user.location = location;
        if (birth_date) user.birth_date = birth_date;
        if (profile_picture) user.profile_picture = profile_picture;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao editar perfil.", error: error.message });
    }
};

module.exports = { registerUser, loginUser, refreshToken, getUserInfo, editProfile };
