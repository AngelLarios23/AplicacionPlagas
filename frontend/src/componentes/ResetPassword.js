// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../estilos/Login.css';

const ResetPassword = () => {
    const { token } = useParams(); // Obtén el token de la URL
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/reset-password/${token}`, { password });
            setMessage(response.data.msg);
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Error al restablecer la contraseña.";
            setMessage(errorMessage);
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleResetPassword}>
                <input 
                    type="password" 
                    placeholder="Nueva Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Restablecer Contraseña</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
