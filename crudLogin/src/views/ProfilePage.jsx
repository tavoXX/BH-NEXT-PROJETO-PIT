// src/pages/ProfilePage.jsx

import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import EditProfile from "../components/EditProfile";

const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Obtém o usuário do localStorage ou do estado global (como Context API)

    // Se o usuário não estiver logado, redireciona para a página de login
    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <h1>Meu Perfil</h1>
            <EditProfile user={user} />  {/* Passando os dados do usuário para o componente EditProfile */}
        </div>
    );
};

export default ProfilePage;
