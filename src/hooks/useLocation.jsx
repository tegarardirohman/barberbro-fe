import React, { useEffect, useState } from 'react'

const useLocation = ({autofetch = false}) => {
    const [userLocation, setUserLocation] = useState(null);

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
      else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    useEffect(() => {
      getUserLocation();
    }, []);

    // Latitude: -7.9348058
    // Longitude: 112.6027173

  return (
    [userLocation, getUserLocation]
  )
}

export default useLocation