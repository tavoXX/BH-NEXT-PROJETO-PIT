const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "O campo de e-mail é obrigatório."],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Por favor, forneça um e-mail válido."],
        },
        password: {
            type: String,
            required: [true, "O campo de senha é obrigatório."],
            minlength: [6, "A senha deve ter pelo menos 6 caracteres."],
        },
        name: {
            type: String,
            required: [true, "O campo de nome é obrigatório."],
            trim: true,
        },
        role: {
            type: String,
            enum: ["cliente", "colaborador"],
            default: "cliente",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
