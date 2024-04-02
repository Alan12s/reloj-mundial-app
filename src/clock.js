import React, { useState, useEffect } from 'react';
const Clock = ({ zonaHoraria, modoOscuro }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const obtenerHora = (zonaHoraria) => {
    return new Date().toLocaleTimeString("en-US", { timeZone: zonaHoraria, hour12: true });
  };

  return (
    <div className={`ClockText ${modoOscuro ? 'dark' : ''}`}>
      {obtenerHora(zonaHoraria)}
    </div>
  );
};

export default Clock;
