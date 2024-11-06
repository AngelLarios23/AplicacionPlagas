import React, { useState, useRef, useEffect } from 'react';
import '../estilos/Foro.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import pesticidaJitomateImg from '../imagenes//pesticida_jitomate.jpg';
import plagasGuayabaImg from '../imagenes//plagas_guayaba.jpg';
import plantaLimonImg from '../imagenes//planta_limon.jpg';
import precaucionesImg from '../imagenes//precauciones.jpg';
import consejosPlagasImg from '../imagenes//consejos_plagas.jpg';

const Foro = () => {
    const [messages, setMessages] = useState([
        {
          title: "Pesticida para plantas de jitomate",
          text: "Los jitomates son susceptibles a diversas plagas y enfermedades que pueden afectar su crecimiento y producción. Un manejo adecuado del pesticida puede mejorar la salud de las plantas. Se recomienda el uso de pesticidas específicos para jitomate, aplicándolos en las primeras etapas de crecimiento. Recuerda siempre leer las instrucciones y esperar el tiempo de seguridad antes de cosechar.",
          id: Date.now(),
          sender: 'other',
          image: pesticidaJitomateImg,
        },
        {
          title: "Plagas en plantas de guayaba",
          text: "La guayaba puede verse afectada por plagas como el picudo y las moscas de la fruta. Para prevenir infestaciones, es esencial realizar inspecciones regulares. Mantén el área alrededor de tus plantas limpia y libre de residuos. Si se detecta alguna plaga, utiliza trampas específicas o insecticidas orgánicos para controlarlas de manera efectiva.",
          id: Date.now() + 1,
          sender: 'other',
          image: plagasGuayabaImg,
        },
        {
          title: "Planta de limón",
          text: "Las plantas de limón son muy valoradas en la jardinería, pero son propensas a plagas como los pulgones y la cochinilla. Asegúrate de mantener la planta bien cuidada y fertilizada. En caso de infestaciones, rocía con una mezcla de agua y jabón biodegradable para eliminar las plagas. Es recomendable realizar podas regulares para promover una mejor circulación de aire.",
          id: Date.now() + 2,
          sender: 'other',
          image: plantaLimonImg,
        },
        {
          title: "Precauciones con el pesticida",
          text: "El uso de pesticidas debe ser siempre responsable. Usa guantes y mascarilla al aplicar productos químicos para protegerte de su toxicidad. Además, sigue las instrucciones del fabricante al pie de la letra. Es crucial no aplicar pesticidas en días de lluvia y mantener a mascotas y niños alejados del área tratada durante al menos 24 horas.",
          id: Date.now() + 3,
          sender: 'other',
          image: precaucionesImg,
        },
        {
          title: "Consejos sobre plagas",
          text: "Prevenir es mejor que curar. Mantén tu jardín limpio y revisa tus plantas regularmente para detectar plagas a tiempo. Usa métodos de control biológico, como introducir insectos benéficos que se alimenten de plagas dañinas. Además, considera la rotación de cultivos para reducir la incidencia de plagas específicas en el suelo.",
          id: Date.now() + 4,
          sender: 'other',
          image: consejosPlagasImg,
        },
      ]);
    
      const [inputValue, setInputValue] = useState('');
      const [selectedImage, setSelectedImage] = useState(null);
      const [isBlocked, setIsBlocked] = useState(false);
      const [isForumActive, setIsForumActive] = useState(true);
      const [menuOpen, setMenuOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const [showStoryInput, setShowStoryInput] = useState(false);
      const [exitMessageVisible, setExitMessageVisible] = useState(false);
      const messagesEndRef = useRef(null);
      const fileInputRef = useRef(null);
      const menuRef = useRef(null);
      const storyInputRef = useRef(null);
      const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
    
      const sendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '' && !isBlocked && isForumActive) {
          const msg = { text: inputValue, id: Date.now(), sender: 'me', image: selectedImage };
          setMessages((prevMessages) => [...prevMessages, msg]);
          setInputValue('');
          setSelectedImage(null);
        }
      };
    
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          sendMessage(e);
        }
      };
    
      const handleImageChange = (e) => {
        if (e.target.files.length) {
          const file = URL.createObjectURL(e.target.files[0]);
          setSelectedImage(file);
        }
      };
    
      const openFileDialog = () => {
        fileInputRef.current.click();
      };
    
      const toggleForum = () => {
        setIsForumActive((prev) => {
          const newState = !prev;
          setExitMessageVisible(newState === false);
          return newState;
        });
      };
    
      const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };
    
      const handleCountStoryClick = () => {
        setShowStoryInput(true);
        toggleMenu();
      };
    
      const handlePesticidaClick = () => {
        setSelectedMessageIndex(0); // Mostrar solo el primer mensaje
      };
    
      const handlePlagaClick = () => {
        setSelectedMessageIndex(1); // Mostrar solo el segundo mensaje
      };
    
      const handlePlantaClick = () => {
        setSelectedMessageIndex(2); // Mostrar solo el tercer mensaje
      };
    
      const handlePrecaucionClick = () => {
        setSelectedMessageIndex(3); // Mostrar solo el cuarto mensaje
      };
    
      const handleConsejosClick = () => {
        setSelectedMessageIndex(4); // Mostrar solo el quinto mensaje
      };
    
      const filteredMessages = selectedMessageIndex !== null
        ? [messages[selectedMessageIndex]] // Mostrar solo el mensaje seleccionado
        : messages.filter((msg) => msg.text.toLowerCase().includes(searchTerm.toLowerCase())); // Todos los mensajes
    
      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
            setSearchTerm('');
          }
          if (showStoryInput && storyInputRef.current && !storyInputRef.current.contains(event.target)) {
            setShowStoryInput(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [menuOpen, showStoryInput]);
    return (
        <div className="App">
        <div className="sidebar">
          <button className="sidebar-button" onClick={handlePesticidaClick}>Pesticida</button>
          <button className="sidebar-button" onClick={handlePlagaClick}>Plaga</button>
          <button className="sidebar-button" onClick={handlePlantaClick}>Plantas</button>
          <button className="sidebar-button" onClick={handlePrecaucionClick}>Precaución</button>
          <button className="sidebar-button" onClick={handleConsejosClick}>Consejos</button> {/* Quinto botón */}
          <button className="sidebar-button">Configuracion</button>
          <button className="sidebar-button">Mas</button>
          <div className="buttons">
          <Link to="/home"><FontAwesomeIcon icon={faHouse} /></Link>
          </div>
        </div>
        <div className="chat-window">
          <div className="header">
            <div className="contact-info">
              <div className="user-info">
                <h2 style={{ flex: 1, textAlign: 'center' }}>Aprender más</h2>
              </div>
            </div>
            <button onClick={toggleMenu} className="menu-button">☰</button>
            {menuOpen && (
              <div className="menu" ref={menuRef}>
                <button onClick={handleCountStoryClick}>Notas</button>
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            )}
          </div>
          <div className="chat-container">
            <div className="messages">
              {filteredMessages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <h3 className="message-title">{msg.title}</h3>
                  <p>{msg.text}</p>
                  {msg.image && (
                    <div>
                      <img src={msg.image} alt="Mensaje visual" className="message-image" />
                    </div>
                  )}
                </div>
              ))}
              {exitMessageVisible && (
                <div className={`message other`}>
                  <p>No puedes publicar ni ver las publicaciones de otros.</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {isBlocked && (
              <div className="blocked-message">No puedes ver lo que sube esta persona.</div>
            )}
          </div>
          {showStoryInput && (
            <form onSubmit={sendMessage} className="message-form" ref={storyInputRef}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => !isBlocked && isForumActive && setInputValue(e.target.value)}
                placeholder={isBlocked ? 'Saliste' : isForumActive ? 'Escribe un mensaje' : 'Saliste del foro'}
                className="message-input"
                disabled={isBlocked || !isForumActive}
                onKeyDown={handleKeyDown}
              />
              <button type="button" onClick={openFileDialog} className="camera-button">📸</button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-input"
                ref={fileInputRef}
              />
              <button type="submit" className="send-button" disabled={isBlocked || !isForumActive}>Compartir</button>
            </form>
          )}

        </div>
      </div>
    );
};

export default Foro;
