import React from 'react';
// import { useParams } from 'react-router-dom'; // Assuming react-router-dom will be used
// import { CITIES } from '../constants'; // Assuming constants.ts will hold city data

const CityDetailPage: React.FC = () => {
  // const { cityId } = useParams<{ cityId: string }>(); // Example usage of useParams
  // const city = CITIES.find(c => c.id === cityId); // Example find

  // if (!city) {
  //   return <div>Ciudad no encontrada</div>;
  // }

  return (
    <div>
      {/* <h1>{city.name}</h1> */}
      <h1>Nombre de la Ciudad</h1>
      <p>Detalles de la ciudad aquí...</p>
      <a href="/index.html">⬅ Volver al itinerario</a>
    </div>
  );
};

export default CityDetailPage;
