import { Button } from '@nextui-org/react';
import React from 'react';

const GoogleMapsLink = ({ latitude, longitude }) => {
  const googleMapsUrl = `https://www.google.com/maps/?q=${latitude},${longitude}`;

  return (
    
    <div className='text-center pt-5 flex justify-between items-end'>
    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
      <Button className=' bg-slate-800 text-slate-100 p-4' size='md' color='default'>Open in Map</Button>
    </a>

    </div>
  );
};

export default GoogleMapsLink;
