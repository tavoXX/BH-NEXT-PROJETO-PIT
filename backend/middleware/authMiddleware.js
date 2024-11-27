const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token ausente ou inválido." });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token não fornecido." });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("Erro ao verificar o token:", err);
                return res.status(401).json({ message: "Token inválido ou expirado." });
            }

            req.user = decoded;
            console.log("Token decodificado:", decoded); 

            next();
        });
    } catch (error) {
        console.error("Erro de autenticação:", error);
        res.status(401).json({ message: "Erro ao processar o token." });
    }
};

module.exports = { protect };
