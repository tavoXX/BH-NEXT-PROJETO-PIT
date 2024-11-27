import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRouteForCollaborator = ({ children }) => {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    if (!isAuthenticated || userRole !== "colaborador") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRouteForCollaborator;
