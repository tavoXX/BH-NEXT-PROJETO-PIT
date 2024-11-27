import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");  // Campo name
    const [role, setRole] = useState("cliente");
    const [error, setError] = useState(null);

    // Campos de cadastro de loja
    const [storeName, setStoreName] = useState("");
    const [storeImage, setStoreImage] = useState(null);
    const [storeCEP, setStoreCEP] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [storeCity, setStoreCity] = useState("");
    const [storeState, setStoreState] = useState("");
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const navigate = useNavigate();

    // Função para obter endereço com ViaCEP
    const getAddressByCEP = (cep) => {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                const { logradouro, localidade, uf } = response.data;
                setStoreAddress(logradouro);
                setStoreCity(localidade);
                setStoreState(uf);
            })
            .catch(error => {
                console.error("Erro ao buscar CEP:", error);
                setError("CEP não encontrado.");
            });
    };

    // Função para lidar com o envio do formulário
    const handleRegister = (e) => {
        e.preventDefault();

        // Envio da requisição para o backend com todos os campos necessários
        const userData = {
            email,
            password,
            name,
            role,
            storeName: role === "colaborador" ? storeName : null,
            storeImage: role === "colaborador" ? storeImage : null,
            storeCEP: role === "colaborador" ? storeCEP : null,
            storeAddress: role === "colaborador" ? storeAddress : null,
            storeCity: role === "colaborador" ? storeCity : null,
            storeState: role === "colaborador" ? storeState : null,
            products: role === "colaborador" ? products : []
        };

        axios.post("http://localhost:5000/api/auth/register", userData)
            .then(response => {
                console.log("Usuário registrado com sucesso:", response.data);
                navigate("/login");
            })
            .catch(error => {
                console.error("Erro ao registrar usuário:", error.response?.data);
                setError(error.response?.data?.message || "Erro desconhecido.");
            });
    };

    // Função para adicionar produto
    const addProduct = () => {
        if (productName && productPrice) {
            setProducts([...products, { name: productName, price: productPrice }]);
            setProductName("");
            setProductPrice("");
        }
    };

    return (
        <div className="container">
            <h2>Registrar</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Tipo de Usuário</label>
                    <select
                        id="role"
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="cliente">Cliente</option>
                        <option value="colaborador">Colaborador</option>
                    </select>
                </div>

                {role === "colaborador" && (
                    <div>
                        <h3>Cadastro da Loja</h3>
                        <div className="mb-3">
                            <label htmlFor="storeName" className="form-label">Nome da Loja</label>
                            <input
                                type="text"
                                id="storeName"
                                className="form-control"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="storeImage" className="form-label">Imagem da Loja</label>
                            <input
                                type="file"
                                id="storeImage"
                                className="form-control"
                                onChange={(e) => setStoreImage(e.target.files[0])}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="storeCEP" className="form-label">CEP</label>
                            <input
                                type="text"
                                id="storeCEP"
                                className="form-control"
                                value={storeCEP}
                                onChange={(e) => {
                                    setStoreCEP(e.target.value);
                                    if (e.target.value.length === 8) {
                                        getAddressByCEP(e.target.value);
                                    }
                                }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="storeAddress" className="form-label">Endereço</label>
                            <input
                                type="text"
                                id="storeAddress"
                                className="form-control"
                                value={storeAddress}
                                onChange={(e) => setStoreAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="storeCity" className="form-label">Cidade</label>
                            <input
                                type="text"
                                id="storeCity"
                                className="form-control"
                                value={storeCity}
                                onChange={(e) => setStoreCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="storeState" className="form-label">Estado</label>
                            <input
                                type="text"
                                id="storeState"
                                className="form-control"
                                value={storeState}
                                onChange={(e) => setStoreState(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <ul>
                                {products.map((product, index) => (
                                    <li key={index}>{product.name} - R${product.price}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
