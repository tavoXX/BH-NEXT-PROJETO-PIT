// src/views/Home.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ShopMap from "../components/ShopMap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { userName, userRole } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("storedToken");
        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get("http://localhost:5000/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar produtos:", error);
                setError("Erro ao carregar os produtos.");
            })
            .finally(() => {
                setLoading(false);
            });

        const savedSelectedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
        if (savedSelectedProducts) {
            setSelectedProducts(savedSelectedProducts);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    }, [selectedProducts]);

    const handleSelectProduct = (product) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.some((p) => p._id === product._id)
                ? prevSelected.filter((p) => p._id !== product._id)
                : [...prevSelected, product]
        );
    };

    const handleReserve = () => {
        navigate("/reserve", { state: { selectedProducts } });
    };

    return (
    <>
        {/* <div className="container-fluid">
            <ShopMap />
        </div> */}
        <div className="container">
            
            {loading ? (
                <p>Carregando produtos...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-3" key={product._id}>
                                <ProductCard
                                    product={product}
                                    isSelected={selectedProducts.some((p) => p._id === product._id)}
                                    onSelect={() => handleSelectProduct(product)}
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleReserve} disabled={!selectedProducts.length}>
                        Reservar Produtos
                    </button>
                </>
            )}
        </div>
        </>
        
    );
};

export default Home;
