import React from 'react';

const GoogleMapsEmbed = ({ latitude, longitude, width = '380', height = '200' }) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;

  return (
    <iframe
      width={width}
      height={height}
      frameBorder="0"
      style={{ border: 0 }}
      src={googleMapsUrl}
      allowFullScreen
      aria-hidden="false"
      tabIndex="0"
      title="Google Maps"
    ></iframe>
  );
};

export default GoogleMapsEmbed;
