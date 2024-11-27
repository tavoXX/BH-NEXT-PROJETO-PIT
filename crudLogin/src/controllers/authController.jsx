import axios from "axios";

// Função para fazer login
const loginUser = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", data);
        console.log("Usuário logado com sucesso:", response.data);

        // Armazenar os tokens
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        return response.data;
    } catch (error) {
        console.error("Erro no login:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Função para fazer o refresh do token
const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
        throw new Error("Refresh token não encontrado.");
    }

    try {
        const response = await axios.post("http://localhost:5000/api/auth/refresh-token", { refreshToken: storedRefreshToken });
        const newAccessToken = response.data.accessToken;

        // Armazenar o novo access token
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Erro ao fazer refresh do token:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Exporte as funções
export { loginUser, refreshToken };
