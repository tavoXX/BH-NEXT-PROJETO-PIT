// src/components/EditProfile.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = ({ user }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        logo: user.logo || '',
        product_type: user.product_type || '',
        location: user.location || '',
        birth_date: user.birth_date || '',
        profile_picture: user.profile_picture || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            userId: user.id,
            name: formData.name,
            email: formData.email,
            logo: formData.logo,
            product_type: formData.product_type,
            location: formData.location,
            birth_date: formData.birth_date,
            profile_picture: formData.profile_picture,
            role: user.role
        };

        try {
            const response = await axios.put("http://localhost:5000/api/profile/edit", data, { withCredentials: true });
            alert(response.data.message);
        } catch (error) {
            alert("Erro ao atualizar perfil");
        }
    };

    return (
        <div>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {user.role === "colaborador" && (
                    <>
                        <div>
                            <label>Logo</label>
                            <input
                                type="text"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Tipo de Produtos</label>
                            <input
                                type="text"
                                name="product_type"
                                value={formData.product_type}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Localização</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}

                {user.role === "cliente" && (
                    <>
                        <div>
                            <label>Data de Nascimento</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={formData.birth_date}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Foto de Perfil</label>
                            <input
                                type="file"
                                name="profile_picture"
                                onChange={(e) => setFormData({ ...formData, profile_picture: e.target.files[0] })}
                            />
                        </div>
                    </>
                )}

                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditProfile;
