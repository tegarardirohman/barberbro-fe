import { Card } from '@nextui-org/react';
import React from 'react';

const ButtonCalendar = ({ day, day_number, trx, handleClick, isToday, isActive }) => {
  return (

    <>
      <div
      // as="button"
      onClick={handleClick}
      className={`
        px-10 py-4 font-bold flex flex-col items-center justify-center space-y-2 rounded-lg
        transition-all duration-200 ease-in-out
        ${isToday ? 'bg-yellow-500 text-white' : 'bg-white text-black'}
        hover:${isToday ? 'bg-yellow-500' : 'bg-white'}
        active:${isToday ? 'bg-yellow-500' : 'bg-white'}
        ${isActive ? 'bg-yellow-500 text-white' : 'bg-white text-black'}
        ${isToday && isActive && 'bg-yellow-500 text-white'} 
        focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
        shadow-lg hover:shadow-xl
        hover:scale-105
        cursor-pointer
      `}
    >
      <h3 className="text-xs">{day}</h3>
      <h2 className="text-3xl">{day_number}</h2>
      <h3 className="text-xs">Schedule: {trx}</h3>
    </div>
    </>

  );
};

export default ButtonCalendar;
