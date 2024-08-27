import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default function MapWithSearch() {
  const [manualMarker, setManualMarker] = useState(null);
  const [address, setAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Function to fetch address details based on lat and lng
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'json',
          addressdetails: 1,
        },
      });
      setAddress(response.data);
    } catch (error) {
      console.error('Error fetching address details:', error);
      setAddress(null);
    }
  };

  // Function to handle map click events
  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setManualMarker({ lat, lng });
    await fetchAddress(lat, lng);
  };

  // Function to handle search input
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: searchQuery,
          format: 'json',
          addressdetails: 1,
        },
      });
      if (response.data.length > 0) {
        const result = response.data[0];
        const { lat, lon, display_name } = result;
        setSearchResult({ lat, lng: lon, label: display_name });
        setManualMarker({ lat, lng: lon });
        await fetchAddress(lat, lon);

        console.log(manualMarker)

      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  // Component to handle map events
  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4 flex justify-between gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a location"
          className="p-2 border rounded-md w-full"
        />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </form>

      <MapContainer
        center={manualMarker ? [manualMarker.lat, manualMarker.lng] : [-7.93473173312304, 112.60267493329516]}
        zoom={manualMarker ? 18 : 18}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {manualMarker && (
          <Marker position={[manualMarker.lat, manualMarker.lng]}>
            <Popup>
              <div>
                <h3>Selected Location</h3>
                <p><strong>Latitude:</strong> {manualMarker.lat}</p>
                <p><strong>Longitude:</strong> {manualMarker.lng}</p>
                {address && (
                  <div>
                    <p><strong>Road:</strong> {address.address?.road || 'N/A'}</p>
                    <p><strong>City:</strong> {address.address?.city || 'N/A'}</p>
                    <p><strong>State:</strong> {address.address?.state || 'N/A'}</p>
                    <p><strong>Country:</strong> {address.address?.country || 'N/A'}</p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
        <MapEvents />
      </MapContainer>
    </div>
  );
}
