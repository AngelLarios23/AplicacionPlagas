import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import Swal from 'sweetalert2';
import { Container } from 'react-bootstrap';
import RecoverPassword from '../componentes/RecoverPassword';
import '../estilos/Login.css';
import mujerImage from '../imagenes/Cultivos.jpg';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      Swal.fire({
        title: 'Inicio de sesión exitoso!',
        text: response.data.msg,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.msg : 'Error al iniciar sesión';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const birthDate = form.birthDate.value;
    const curp = form.curp.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!name || !lastName || !birthDate || !curp || !email || !password) {
      Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    const birthDateObj = new Date(birthDate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();
    if (age < 18) {
      Swal.fire('Error', 'Debes ser mayor de edad para registrarte.', 'error');
      return;
    }

    if (password.length < 6 || password.length > 16) {
      Swal.fire('Error', 'La contraseña debe tener entre 6 y 16 caracteres.', 'error');
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,16}$/;
    if (!passwordPattern.test(password)) {
      Swal.fire('Error', 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial.', 'error');
      return;
    }

    const curpPattern = /^[A-Z]{4}\d{6}[HM]\d{2}[A-Z]{3}$/;
    if (!curpPattern.test(curp)) {
      Swal.fire('Error', 'CURP no válido o no pertenece a una mujer.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire('Error', 'Por favor, ingresa un correo electrónico válido.', 'error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/register', { name, lastName, birthDate, curp, email, password });
      Swal.fire({
        title: 'Registro exitoso!',
        text: response.data.msg,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.msg : 'Error al registrar';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  return (
    <Container fluid className="App-header d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card">
          <div className="row g-0">
            {!isRegistering && (
              <div className="col-md-6 d-none d-md-block">
                <img src={mujerImage} alt="formulario de inicio de sesión" className="img-fluid" />
              </div>
            )}
            <div className={`col ${isRegistering ? 'col-12' : 'col-md-6'} d-flex align-items-center`}>
              <div className="card-body p-5 text-black">
                {!isRegistering ? (
                  <form onSubmit={handleLogin}>
                    <h5 className="fw-normal mb-4 text-center" style={{ letterSpacing: '1px' }}>
                      Inicia sesión en tu cuenta
                    </h5>
                    <div className="form-outline mb-4">
                      <input type="email" name="email" className="form-control form-control-lg" placeholder="Dirección de correo electrónico" required />
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" name="password" className="form-control form-control-lg" placeholder="Contraseña" required />
                    </div>
                    <div className="pt-1 mb-4">
                      <button className="btn btn-primary btn-lg btn-block" type="submit">Iniciar sesión</button>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/register">¿No tienes una cuenta? Regístrate aquí</Link>
                      <p className="mb-0">
                        <Link className="small" to="/recoverPassword">¿Olvidaste tu contraseña?</Link>
                      </p>
                    </div>
                  </form>
                ) : isRegistering === 'recover' ? (
                  <RecoverPassword />
                ) : (
                  <form onSubmit={handleRegister}>
                    <h5 className="fw-normal mb-4 text-center" style={{ letterSpacing: '1px' }}>
                      Registro
                    </h5>
                    <div className="form-outline mb-4">
                      <input type="text" name="name" className="form-control form-control-lg" placeholder="Nombre" required />
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="lastName" className="form-control form-control-lg" placeholder="Apellidos" required />
                    </div>
                    <div className="form-outline mb-4">
                      <input type="date" name="birthDate" className="form-control form-control-lg" required />
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" name="curp" className="form-control form-control-lg" placeholder="CURP" required />
                    </div>
                    <div className="form-outline mb-4">
                      <input type="email" name="email" className="form-control form-control-lg" placeholder="Dirección de correo electrónico" required />
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" name="password" className="form-control form-control-lg" placeholder="Contraseña" required />
                    </div>
                    <div className="pt-1 mb-4">
                      <button className="btn btn-primary btn-lg btn-block" type="submit">Registrarse</button>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/">¿Ya tienes una cuenta? Inicia sesión aquí</Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
        <Link to="/home"><FontAwesomeIcon icon={faHouse} /></Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
