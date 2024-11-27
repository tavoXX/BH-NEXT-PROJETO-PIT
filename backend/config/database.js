const mongoose = require("mongoose");
require("dotenv").config(); 

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error("Erro: A variável de ambiente MONGO_URI não está definida.");
        process.exit(1);  
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,      
            useUnifiedTopology: true,   
        });

        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error("Erro ao conectar com o MongoDB:", error);
        process.exit(1);  
    }
};

module.exports = connectDB;
