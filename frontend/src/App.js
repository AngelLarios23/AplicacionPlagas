import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componentes/Login';
import Register from './componentes/Register';
import RecoverPassword from './componentes/RecoverPassword';
import ResetPassword from './componentes/ResetPassword';
import Home from './componentes/Home';
import Calendario from './componentes/Calendario';
import CamaraIA from './componentes/CamaraIA';
import Foro from './componentes/Foro';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='/register' element={<Register/>}/>
                <Route path='/RecoverPassword' element={<RecoverPassword/>}/>
                <Route path='/ResetPassword' element={<ResetPassword/>}/>
                <Route path="/home" element={<Home />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/camaraIA" element={<CamaraIA />} /> {/* Ruta para CamaraIA */}
                <Route path="/foro" element={<Foro />} /> {/* Ruta para Foro */}
            </Routes>
        </Router>
    );
};

export default App;