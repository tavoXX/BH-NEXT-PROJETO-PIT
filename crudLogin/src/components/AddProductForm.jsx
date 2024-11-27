import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: "", 
        imageFile: null, 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            imageFile: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("description", product.description);
        
        if (product.imageFile) {
            formData.append("image", product.imageFile);
        } else {
            formData.append("imageUrl", product.imageUrl);
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/products", 
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log("Produto adicionado com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Adicionar Novo Produto</h2>
            <form onSubmit={handleSubmit} className="shadow p-4 rounded border">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome do Produto</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Preço</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descrição</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Imagem (URL)</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Cole o link da imagem aqui"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageFile" className="form-label">Ou selecione um arquivo de imagem</label>
                    <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        onChange={handleFileChange}
                        className="form-control"
                        accept="image/*"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Adicionar Produto</button>
            </form>
        </div>
    );
};

export default AddProductForm;
