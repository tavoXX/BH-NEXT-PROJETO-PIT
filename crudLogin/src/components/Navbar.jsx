import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Importa o contexto

const Navbar = () => {
    const { isAuthenticated, userRole, userName, logout } = useContext(AuthContext); // Usa o contexto
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">BhNext</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!isAuthenticated ? (
                            <>
                                {/* Links para usuários não autenticados */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Registrar</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text">Olá, {userName || "Usuário"}!</span> <br />
                                    <span className="navbar-text">Sessão de {userRole || "Usuário"}!</span>
                                </li>

                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Menu
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        {userRole === "cliente" && (
                                            <>
                                                <li>
                                                    <Link className="dropdown-item" to="/cliente">Dashboard Cliente</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/cliente/perfil">Editar Perfil</Link>
                                                </li>
                                            </>
                                        )}

                                        {userRole === "colaborador" && (
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link" to="/colaborador/registrar-loja">Registrar Loja</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/colaborador">Dashboard Colaborador</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/colaborador/perfil">Editar Perfil</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/colaborador/produtos">Gerenciar Produtos</Link>
                                                </li>
                                            </>
                                        )}

                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>Sair</button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
