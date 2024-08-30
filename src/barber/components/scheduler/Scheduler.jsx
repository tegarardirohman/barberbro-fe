import React, { useState } from 'react';
import ButtonCalendar from './ButtonCalendar';
import { Button } from '@nextui-org/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

// Helper function to get start and end dates of the current week
const getWeekDates = (startDate) => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Helper function to get start of the week from a date
const getStartOfWeek = (date) => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
};

const Scheduler = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const weekDates = getWeekDates(currentWeekStart);
  const today = new Date().toDateString(); // Get today's date as a string

  const handlePrevWeek = () => {
    setCurrentWeekStart(prevStart => {
      const newStart = new Date(prevStart);
      newStart.setDate(newStart.getDate() - 7);
      return getStartOfWeek(newStart);
    });
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(prevStart => {
      const newStart = new Date(prevStart);
      newStart.setDate(newStart.getDate() + 7);
      return getStartOfWeek(newStart);
    });
  };

  const handleClick = (day) => {
    alert(`Clicked on ${day}`);
  };

  return (
    <div className="flex items-center justify-between p-4 gap-4">
      {/* Previous week button */}
      <Button
        className="h-32 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
        auto
        onClick={handlePrevWeek}
      >
        <FaChevronLeft size={20} />
      </Button>

      {/* Calendar for the current week */}
      <div className="flex flex-wrap gap-4">
        {weekDates.map((date, index) => (
          <ButtonCalendar
            key={index}
            day={date.toLocaleDateString('en-US', { weekday: 'long' })}
            day_number={date.getDate()}
            trx="10" // Replace with actual data if needed
            handleClick={() => handleClick(date.toDateString())}
            isToday={date.toDateString() === today}
          />
        ))}
      </div>

      {/* Next week button */}
      <Button
        className="h-32 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
        auto
        onClick={handleNextWeek}
      >
        <FaChevronRight size={20} />
      </Button>
    </div>
  );
};

export default Scheduler;
