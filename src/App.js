import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaSun, FaMoon } from 'react-icons/fa';
import './App.css';

const paises = [
  { nombre: "Argentina", zonaHoraria: "America/Argentina/Buenos_Aires" },
  { nombre: "España", zonaHoraria: "Europe/Madrid" },
  { nombre: "Estados Unidos", zonaHoraria: "America/New_York" },
  { nombre: "Japón", zonaHoraria: "Asia/Tokyo" },
  { nombre: "China", zonaHoraria: "Asia/Shanghai" },
  // Agrega más países aquí
  { nombre: "Australia", zonaHoraria: "Australia/Sydney" },
  { nombre: "Canadá", zonaHoraria: "America/Toronto" },
  { nombre: "Brasil", zonaHoraria: "America/Sao_Paulo" },
  { nombre: "Francia", zonaHoraria: "Europe/Paris" },
  { nombre: "Alemania", zonaHoraria: "Europe/Berlin" },
  { nombre: "Italia", zonaHoraria: "Europe/Rome" },
  { nombre: "Reino Unido", zonaHoraria: "Europe/London" },
  { nombre: "India", zonaHoraria: "Asia/Kolkata" },
  { nombre: "Rusia", zonaHoraria: "Europe/Moscow" },
  { nombre: "México", zonaHoraria: "America/Mexico_City" },
  { nombre: "Corea del Sur", zonaHoraria: "Asia/Seoul" },
  { nombre: "Indonesia", zonaHoraria: "Asia/Jakarta" },
  { nombre: "Sudáfrica", zonaHoraria: "Africa/Johannesburg" },
  { nombre: "Arabia Saudita", zonaHoraria: "Asia/Riyadh" },
  { nombre: "Turquía", zonaHoraria: "Europe/Istanbul" },
];

function App() {
  const [time, setTime] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('worldClock');
  const [darkMode, setDarkMode] = useState(false);
  const [paisSeleccionado, setPaisSeleccionado] = useState(paises[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const obtenerHora = (zonaHoraria) => {
    const horaLocal = new Date().toLocaleTimeString("en-US", { timeZone: zonaHoraria, hour12: true });
    return horaLocal;
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleChangePais = (e) => {
    const selectedCountry = paises.find((pais) => pais.nombre === e.target.value);
    setPaisSeleccionado(selectedCountry);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="Formulario">
        <div className="Menu">
          <h2>Menú</h2>
          <motion.ul
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.li
              whileHover={{ scale: 1.1 }}
              onClick={() => handleOptionChange('worldClock')}
            >
              <FaGlobe /> Reloj Mundial
            </motion.li>
          </motion.ul>
        </div>
        {selectedOption === 'worldClock' && (
          <div className="ClockContainer">
            <div className="ClockWrapper">
              <motion.div
                className="Clock"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="ClockText"
                >
                  {obtenerHora(paisSeleccionado.zonaHoraria)}
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
        {selectedOption === 'worldClock' && (
          <div className="Options">
            <h2>Selecciona un país:</h2>
            <motion.select
              value={paisSeleccionado.nombre}
              onChange={handleChangePais}
              whileHover={{ scale: 1.1 }}
            >
              {paises.map((pais) => (
                <option key={pais.nombre}>{pais.nombre}</option>
              ))}
            </motion.select>
          </div>
        )}
        <motion.button
          className={`DarkModeButton ${darkMode ? 'dark' : ''}`}
          whileHover={{ scale: 1.1, rotate: darkMode ? 0 : 360 }}
          onClick={handleDarkModeToggle}
        >
          {darkMode ? <FaSun /> : <FaMoon />} Modo {darkMode ? 'Claro' : 'Oscuro'}
        </motion.button>
      </div>
    </div>
  );
}

export default App;
