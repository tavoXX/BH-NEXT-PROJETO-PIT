// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product, onSelect }) => {
    return (
        <div className="product-card card p-3">
            <div className="product-imagem text-center mb-3">
                {product.imageUrl ? (
                    <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} className="img-fluid" />
                ) : (
                    <p>Imagem não disponível</p>
                )}
            </div>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text text-muted">R$<span>{product.price}</span></p>
            <button 
                onClick={() => onSelect(product._id)} 
                className="btn btn-outline-primary mt-2"
            >
                Selecionar
            </button>
        </div>
    );
};

export default ProductCard;