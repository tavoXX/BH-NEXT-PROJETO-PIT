import React from 'react';
import { Link } from 'react-router-dom';
import AddProductForm from '../components/AddProductForm'; 
import ProfileEdit from './ProfileEdit';

const ColaboradorDashboard = () => {
    return (
        <div className="container">
            <h2>Bem-vindo ao Dashboard do Colaborador!</h2>
            <div>
                <h3>Área de Manutenção de Produtos</h3>
                <AddProductForm />
            </div>

            <div className="mt-4">
                <h3>Área de Edição de Perfil</h3>
                <Link to="/colaborador/perfil">Editar Perfil</Link>
            </div>
        </div>
    );
};

export default ColaboradorDashboard;
