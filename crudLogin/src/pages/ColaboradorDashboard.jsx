import React from 'react';
import AddProductForm from '../components/AddProductForm'; 

const Dashboard = () => {
    return (
        <div className="container">
            <h2>Bem-vindo ao Dashboard do Colaborador!</h2>
            <AddProductForm /> 
        </div>
    );
};

export default Dashboard;
