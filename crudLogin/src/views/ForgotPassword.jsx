// src/views/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            setMessage("Um e-mail foi enviado com as instruções para redefinir sua senha.");
        } catch (error) {
            setMessage("Não foi possível processar sua solicitação. Tente novamente.");
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Esqueceu a senha?</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleForgotPassword} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Insira seu email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
