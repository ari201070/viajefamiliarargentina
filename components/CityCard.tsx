import React from 'react';

interface CityCardProps {
  imageUrl: string;
  name: string;
  description: string;
  detailsLink: string;
}

const CityCard: React.FC<CityCardProps> = ({ imageUrl, name, description, detailsLink }) => {
  return (
    <div className="city-card">
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <a href={detailsLink}>Explorar más detalles</a>
    </div>
  );
};

export default CityCard;
