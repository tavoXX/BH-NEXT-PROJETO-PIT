import React, { useState, useEffect } from "react";
import axios from "axios";

const ClienteProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // Função para carregar os dados do perfil
    const fetchProfileData = () => {
        axios.get("http://localhost:5000/api/shops/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(err => {
            setError("Erro ao carregar dados do perfil.");
            console.error(err);
        });
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container">
            <h2>Perfil do Cliente</h2>
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`http://localhost:5000/uploads/${user.storeImage}`}
                        alt="Logo da Loja"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-8">
                    <h3>{user.storeName}</h3>
                    <p><strong>Endereço:</strong> {user.storeAddress}</p>
                    <p><strong>Cidade:</strong> {user.storeCity}</p>
                    <p><strong>Estado:</strong> {user.storeState}</p>
                    <p><strong>CEP:</strong> {user.storeCEP}</p>

                    <h4>Produtos:</h4>
                    <ul>
                        {user.products && user.products.length > 0 ? (
                            user.products.map((product, index) => (
                                <li key={index}>{product.name} - R${product.price}</li>
                            ))
                        ) : (
                            <p>Nenhum produto cadastrado.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ClienteProfile;
