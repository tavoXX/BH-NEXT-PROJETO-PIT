import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profilePicture: "",
        birthdate: "",
        companyLogo: "",
        companyEmployees: "",
        niche: "",
        location: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userRole = localStorage.getItem("role"); // "cliente" ou "colaborador"
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Buscar os dados do usuário
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Erro ao carregar os dados do perfil.");
                setLoading(false);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            // Se o campo for de arquivo, pegar o arquivo selecionado
            setFormData({ ...formData, [name]: files[0] });
        } else {
            // Caso contrário, pegar o valor do input
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const formDataToSend = new FormData();
            for (let key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            await axios.put("http://localhost:5000/api/auth/profile", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Importante para upload de arquivos
                },
            });
            navigate(`/${userRole}`);
        } catch (err) {
            setError("Erro ao atualizar o perfil. Tente novamente.");
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="container">
            <h2 className="text-center mt-4">Editar Perfil</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleProfileUpdate} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                    />
                </div>

                {userRole === "cliente" && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="profilePicture" className="form-label">Foto de Perfil</label>
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthdate" className="form-label">Data de Nascimento</label>
                            <input
                                type="date"
                                id="birthdate"
                                name="birthdate"
                                className="form-control"
                                value={formData.birthdate}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}

                {userRole === "colaborador" && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="companyLogo" className="form-label">Logo da Empresa</label>
                            <input
                                type="file"
                                id="companyLogo"
                                name="companyLogo"
                                className="form-control"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="companyEmployees" className="form-label">Número de Funcionários</label>
                            <input
                                type="number"
                                id="companyEmployees"
                                name="companyEmployees"
                                className="form-control"
                                value={formData.companyEmployees}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="niche" className="form-label">Nicho</label>
                            <input
                                type="text"
                                id="niche"
                                name="niche"
                                className="form-control"
                                value={formData.niche}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Localização</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="form-control"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="btn btn-primary w-100">Atualizar Perfil</button>
            </form>
        </div>
    );
};

export default ProfileEdit;
