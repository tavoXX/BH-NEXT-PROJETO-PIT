import React from 'react';
import { useLocation } from 'react-router-dom';

const ReservePage = () => {
    const location = useLocation();
    const { selectedProducts } = location.state || { selectedProducts: [] };

    return (
        <div className="container">
            <h2>Produtos Reservados</h2>
            {selectedProducts.length > 0 ? (
                <div className="row">
                    {selectedProducts.map((product) => (
                        <div className="col-md-4" key={product._id}>
                            <div className="card">
                                <img 
                                    src={`http://localhost:5000${product.imageUrl}`} 
                                    alt={product.name} 
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhum produto reservado.</p>
            )}
        </div>
    );
};

export default ReservePage;
