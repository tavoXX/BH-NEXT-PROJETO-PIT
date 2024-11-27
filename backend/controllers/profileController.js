// controllers/profileController.js

const User = require('../models/User'); // ou o modelo do seu banco de dados

// Função para editar o perfil
exports.editProfile = async (req, res) => {
    const { name, email, role, birth_date, profile_picture, companyLogo, companyEmployees, niche, location } = req.body;

    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Atualizando informações específicas do "cliente"
        if (role === "cliente") {
            if (profile_picture) user.profile_picture = profile_picture;
            if (birth_date) user.birth_date = birth_date;
        }

        // Atualizando informações específicas do "colaborador"
        if (role === "colaborador") {
            if (companyLogo) user.companyLogo = companyLogo;
            if (companyEmployees) user.companyEmployees = companyEmployees;
            if (niche) user.niche = niche;
            if (location) user.location = location;
        }

        // Atualizando nome e email
        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({ message: 'Perfil atualizado com sucesso!', user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
    }
};
