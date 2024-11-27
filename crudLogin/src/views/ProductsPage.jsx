// src/pages/ProductsPage.jsx
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const ProductsPage = ({ products }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const navigate = useNavigate();

    const handleSelectProduct = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const handleReserve = () => {
        const selectedProductDetails = products.filter((product) =>
            selectedProducts.includes(product._id)
        );
        navigate('/reserve', { state: { selectedProducts: selectedProductDetails } });
    };

    return (
        <div className="container">
            <h2 className="mb-4">Produtos Disponíveis</h2>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-3" key={product._id}>
                        <ProductCard
                            product={product}
                            onSelect={handleSelectProduct}
                            isSelected={selectedProducts.includes(product._id)}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleReserve}
                className="btn btn-primary mt-3"
                disabled={selectedProducts.length === 0}
            >
                Reservar Produtos
            </button>
        </div>
    );
};

export default ProductsPage;
