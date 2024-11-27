const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboard");
const shopRoutes = require("./routes/shopRoutes");
const path = require("path");
const helmet = require("helmet");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { protect } = require('./middleware/authMiddleware');
const upload = require('./middleware/upload');
const Shop = require("./models/Shop");  // Adicionando o modelo da loja

const app = express();

// Conectar ao banco de dados
connectDB()
    .then(() => console.log("Banco de dados conectado com sucesso!"))
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
        process.exit(1);
    });

// Middleware
app.use(helmet());
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Serve arquivos estáticos da pasta /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rota para criar uma loja
app.post('/api/shops/register', upload.single('logo'), protect, async (req, res) => {
    const { name, address, latitude, longitude, cep, numero, bairro, cidade, uf } = req.body;

    // Verificar se os campos obrigatórios foram preenchidos
    if (!name || !address || !req.file || !latitude || !longitude) {
        return res.status(400).json({ message: "Nome, endereço, logo, latitude e longitude são obrigatórios." });
    }

    // Salvar caminho da imagem
    const logoPath = `/uploads/logos/${req.file.filename}`;

    try {
        // Salvar a loja no banco de dados
        const shop = await Shop.create({
            name,
            address,
            latitude,
            longitude,
            cep,
            numero,
            bairro,
            cidade,
            uf,
            logo: logoPath,
            userId: req.user.id,  // Salvando o ID do usuário que está criando a loja
        });

        res.status(201).json(shop);
    } catch (error) {
        console.error('Erro ao salvar loja:', error);
        res.status(500).json({ message: 'Erro ao salvar a loja no banco de dados.' });
    }
});

// Rota para obter informações do usuário logado
app.get("/api/auth/user-info", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token ausente." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
});

// Rota para obter o perfil da loja do usuário logado
app.get("/api/shops/profile", protect, async (req, res) => {
    try {
        // Procurar loja relacionada ao usuário logado
        const shop = await Shop.findOne({ userId: req.user.id }).populate('products');
        if (!shop) {
            return res.status(404).json({ message: "Loja não encontrada." });
        }
        res.status(200).json(shop);
    } catch (error) {
        console.error('Erro ao buscar perfil da loja:', error);
        res.status(500).json({ message: "Erro ao carregar perfil da loja." });
    }
});

// Outras rotas
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shops", shopRoutes);

// Rota de teste
app.get("/", (req, res) => res.send("API funcionando!"));

// Iniciar o servidor
app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`);
});
