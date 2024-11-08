import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faHouse, faComments, faCamera, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from 'recharts';
import '../estilos/Home.css';

const data = [
    { name: "Dia 01", value: 10 },
    { name: "Dia 02", value: 10 },
    { name: "Dia 03", value: 10 },
    { name: "Dia 04", value: 10 },
    { name: "Dia 05", value: 10 },
    { name: "Dia 06", value: 10 },
    { name: "Dia 07", value: 10 },
    { name: "Dia 08", value: 10 },
    { name: "Dia 09", value: 10 },
    { name: "Dia 10", value: 10 },
    { name: "Dia 11", value: 10 },
    { name: "Dia 12", value: 10 },
    { name: "Dia 13", value: 10 },
    { name: "Dia 14", value: 10 },
    { name: "Dia 15", value: 10 },
    { name: "Dia 16", value: 10 },
    { name: "Dia 17", value: 10 },
    { name: "Dia 18", value: 10 },
    { name: "Dia 19", value: 10 },
    { name: "Dia 20", value: 10 },
    { name: "Dia 21", value: 10 },
    { name: "Dia 22", value: 10 },
    { name: "Dia 23", value: 10 },
    { name: "Dia 24", value: 10 },
    { name: "Dia 25", value: 10 },
    { name: "Dia 26", value: 10 },
    { name: "Dia 27", value: 10 },
    { name: "Dia 28", value: 10 },
    { name: "Dia 29", value: 10 },
    { name: "Dia 30", value: 10 }

    // Agrega el resto de los datos aquí
  ];
  const COLORS = ['#ce93d8', '#5c6bc0', '#b39ddb', '#4dd0e1', '#f48fb1'];

const Home = () => {

  const [position, setPosition] = useState([21.8853, -102.2910]);
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error al obtener ubicación:", error.message);
        }
      );
    }
  }, []);

  const handlePanicButtonClick = () => {
    setShowAlert(true);
    setCountdown(10);
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && isButtonDisabled) {
      setIsButtonDisabled(false);
      setShowAlert(false);
    }
  }, [countdown, isButtonDisabled]);

    return (
        <div className="container">
        <header>
          <h1>HarvestShield</h1>
          <h8>By TNT🌱</h8>
        </header>
        <main className="FondoPrincipal" style={{ position: 'relative' }}>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={data} innerRadius={60} outerRadius={85}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </main>
        <div className="body">
        <div className="buttons">
        <Link to="/home"><FontAwesomeIcon icon={faHouse} /></Link>
        <Link to="/calendario"><FontAwesomeIcon icon={faCalendarDays} /></Link>
        <div className='buttonaIA'>
        <Link to="/camaraIA"><FontAwesomeIcon icon={faCamera} /></Link> {/* Enlace a CamaraIA */}
        </div>
        <Link to="/foro"><FontAwesomeIcon icon={faComments} /></Link> {/* Enlace a Foro */}
        </div>
        </div>
        </div>
    );
};

export default Home;
