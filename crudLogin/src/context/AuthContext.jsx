// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("storedToken");
        const role = localStorage.getItem("role");
        const name = localStorage.getItem("name");

        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
            setUserName(name);
        }
    }, []);

    const login = (name, role, token) => {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(name);
        localStorage.setItem("storedToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserName(null);
        localStorage.removeItem("storedToken");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
