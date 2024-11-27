import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopMap = () => {
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [nomeLoja, setNomeLoja] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [imagem, setImagem] = useState(null); // Novo estado para a imagem
    const [map, setMap] = useState(null);

    // Função para buscar o endereço pelo CEP
    const buscarEndereco = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;
            if (!data.erro) {
                setEndereco(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.localidade);
                setUf(data.uf);
                obterCoordenadas(data.logradouro, data.localidade, data.uf);
            } else {
                alert('CEP não encontrado.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar o endereço.');
        }
    };

    // Função para obter a latitude e longitude através do Google Geocoding API
    const obterCoordenadas = async (logradouro, cidade, uf) => {
        const key = 'YOUR_GOOGLE_MAPS_API_KEY'; // Substitua pela sua chave da API
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${logradouro},${cidade},${uf}&key=${key}`;
        try {
            const response = await axios.get(geocodeUrl);
            if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setLatitude(location.lat);
                setLongitude(location.lng);
            }
        } catch (error) {
            console.error('Erro ao buscar coordenadas:', error);
        }
    };

    // Função para inicializar o mapa
    const initMap = () => {
        if (latitude && longitude) {
            const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: latitude, lng: longitude },
                zoom: 15,
            });
            const marker = new window.google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: mapInstance,
                title: nomeLoja,
            });

            // Adicionando a imagem do pin (logo da loja)
            const infoWindow = new window.google.maps.InfoWindow({
                content: `<div><img src="${imagem}" alt="Logo" style="width: 100px; height: 100px;" /><br><b>${nomeLoja}</b></div>`,
            });

            marker.addListener('click', () => {
                infoWindow.open(mapInstance, marker);
            });

            setMap(mapInstance);
        }
    };

    // Efeito para inicializar o mapa
    useEffect(() => {
        if (latitude && longitude) {
            initMap();
        }
    }, [latitude, longitude]);

    // Função para fazer upload da imagem para o servidor
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagem(URL.createObjectURL(file)); // Exibe a imagem antes de enviar
        }
    };

    // Função de envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', nomeLoja);  // Ajustado para o campo correto no backend
        formData.append('cep', cep);
        formData.append('numero', numero);
        formData.append('address', endereco);
        formData.append('bairro', bairro);
        formData.append('cidade', cidade);
        formData.append('uf', uf);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('logo', imagem);  // Envia a imagem

        try {
            const response = await axios.post('http://localhost:5000/api/shops/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Loja cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar loja:', error);
            alert('Erro ao cadastrar loja.');
        }
    };

    return (
        <div>
            <h1>Cadastrar Loja</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome da Loja</label>
                    <input
                        type="text"
                        value={nomeLoja}
                        onChange={(e) => setNomeLoja(e.target.value)}
                    />
                </div>
                <div>
                    <label>CEP</label>
                    <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        onBlur={() => buscarEndereco(cep)}
                    />
                </div>
                <div>
                    <label>Número</label>
                    <input
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                </div>
                <div>
                    <label>Endereço</label>
                    <input
                        type="text"
                        value={endereco}
                        disabled
                    />
                </div>
                <div>
                    <label>Bairro</label>
                    <input
                        type="text"
                        value={bairro}
                        disabled
                    />
                </div>
                <div>
                    <label>Cidade</label>
                    <input
                        type="text"
                        value={cidade}
                        disabled
                    />
                </div>
                <div>
                    <label>UF</label>
                    <input
                        type="text"
                        value={uf}
                        disabled
                    />
                </div>
                <div>
                    <label>Imagem (Logo)</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Cadastrar Loja</button>
            </form>

            <div id="map" style={{ width: '100%', height: '500px', marginTop: '20px' }}></div>
        </div>
    );
};

export default ShopMap;
