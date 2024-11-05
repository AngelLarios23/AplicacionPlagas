import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './componentes/Home';
import Calendario from './componentes/Calendario';
import CamaraIA from './componentes/CamaraIA';
import Foro from './componentes/Foro';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/camaraIA" element={<CamaraIA />} /> {/* Ruta para CamaraIA */}
                <Route path="/foro" element={<Foro />} /> {/* Ruta para Foro */}
            </Routes>
        </Router>
    );
};

export default App;
