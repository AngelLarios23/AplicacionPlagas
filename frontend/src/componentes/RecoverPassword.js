import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import mujerImage from '../imagenes/Cultivos.jpg';
import '../estilos/Login.css';

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleRecoverPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire('Error', 'Por favor, ingresa tu correo electrónico.', 'error');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/recover-password', { email });
            setMessage(response.data.msg);
            Swal.fire('Éxito', response.data.msg, 'success');
        } catch (error) {
            const errorMessage = error.response ? error.response.data.msg : 'Error al recuperar la contraseña';
            Swal.fire('Error', errorMessage, 'error');
        }
    };

    return (
        <div fluid className="App-header d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="row g-0">
            <div className="col-md-6 d-none d-md-block">
                <img src={mujerImage} alt="Recuperación de contraseña" className="img-fluid" />
            </div>
            <div className="col">
                <div className="card-body p-5 text-black">
                    <form onSubmit={handleRecoverPassword}>
                        <h5 className="fw-normal mb-4 text-center" style={{ letterSpacing: '1px' }}>
                            Recuperar Contraseña
                        </h5>
                        <div className="form-outline mb-4">
                            <input
                                type="email"
                                name="email"
                                className="form-control form-control-lg"
                                placeholder="Dirección de correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="pt-1 mb-4">
                            <button className="btn btn-primary btn-lg btn-block" type="submit">
                                Recuperar Contraseña
                            </button>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
        </div>
    );
};

export default RecoverPassword;