// src/views/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            const { token, user } = response.data;

            login(user.name, user.role, token);
            navigate(user.role === "cliente" ? "/cliente" : "/colaborador");
        } catch (error) {
            setError("Erro ao fazer login. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Digite seu email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <span className="text-muted">Não tem uma conta? </span>
                    <a href="/register" className="text-decoration-none">Cadastre-se</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
