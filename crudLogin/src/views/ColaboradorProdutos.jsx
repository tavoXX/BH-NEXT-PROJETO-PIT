import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Button, 
  Modal, 
  Form, 
  Alert, 
  Card, 
  Row, 
  Col 
} from 'react-bootstrap';

const ColaboradorProdutos = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null
    });

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("storedToken")}`,
                }
            });
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            setError("Erro ao carregar os produtos.");
            setLoading(false);
        }
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', currentProduct.name);
        formData.append('price', currentProduct.price);
        formData.append('description', currentProduct.description);
        if (currentProduct.image) {
            formData.append('image', currentProduct.image);
        }

        try {
            if (currentProduct._id) {
                await axios.put(`http://localhost:5000/api/products/${currentProduct._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("storedToken")}`
                    }
                });
            } else {
                await axios.post("http://localhost:5000/api/products", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("storedToken")}`
                    }
                });
            }
            
            fetchProducts();
            setShowModal(false);
            setCurrentProduct({
                name: '',
                price: '',
                description: '',
                image: null
            });
        } catch (err) {
            setError("Erro ao salvar o produto.");
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("storedToken")}`
                    }
                });
                fetchProducts();
            } catch (err) {
                setError("Erro ao excluir o produto.");
            }
        }
    };

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleNewProduct = () => {
        setCurrentProduct({
            name: '',
            price: '',
            description: '',
            image: null
        });
        setShowModal(true);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Carregando produtos...</div>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div className="container">
            <h2 className="my-4">Gerenciar Produtos</h2>
            
            <Button 
                variant="primary" 
                onClick={handleNewProduct} 
                className="mb-4"
            >
                Adicionar Novo Produto
            </Button>

            <Row>
                {products.length === 0 ? (
                    <Col>
                        <Alert variant="info">Nenhum produto cadastrado.</Alert>
                    </Col>
                ) : (
                    products.map((product) => (
                        <Col md={4} key={product._id} className="mb-4">
                            <Card>
                                <Card.Img 
                                    variant="top" 
                                    src={`http://localhost:5000/uploads/${product.image}`} 
                                    alt={product.name} 
                                />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        Preço: R${product.price}
                                        <br />
                                        {product.description}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button 
                                            variant="warning" 
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            onClick={() => handleDeleteProduct(product._id)}
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>

            {/* Modal de Edição/Criação de Produto */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentProduct._id ? 'Editar Produto' : 'Novo Produto'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSaveProduct}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome do Produto</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={currentProduct.name}
                                onChange={(e) => setCurrentProduct({
                                    ...currentProduct, 
                                    name: e.target.value
                                })}
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control 
                                type="number" 
                                step="0.01"
                                value={currentProduct.price}
                                onChange={(e) => setCurrentProduct({
                                    ...currentProduct, 
                                    price: e.target.value
                                })}
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                value={currentProduct.description}
                                onChange={(e) => setCurrentProduct({
                                    ...currentProduct, 
                                    description: e.target.value
                                })}
                                required 
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control 
                                type="file" 
                                onChange={(e) => setCurrentProduct({
                                    ...currentProduct, 
                                    image: e.target.files[0]
                                })}
                                accept="image/*"
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            {currentProduct._id ? 'Atualizar' : 'Criar'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ColaboradorProdutos;