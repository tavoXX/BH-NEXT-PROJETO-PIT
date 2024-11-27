// src/views/ClienteProfileEdit.jsx
import React, { useState } from 'react';

const ClienteProfileEdit = () => {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h2>Editar Perfil - Cliente</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Data de Nascimento:
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </label>
                <label>
                    Foto de Perfil:
                    <input
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                </label>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default ClienteProfileEdit;
