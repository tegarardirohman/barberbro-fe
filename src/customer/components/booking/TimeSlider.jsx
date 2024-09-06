import React, { useState, useEffect } from 'react';

const getAvailableHours = (openingTime, closingTime) => {
  const availableHours = [];
  let currentTime = new Date(`1970-01-01T${openingTime}`);
  const endTime = new Date(`1970-01-01T${closingTime}`);

  while (currentTime < endTime) { // Perhatikan perubahan dari <= menjadi <
    availableHours.push(currentTime.toTimeString().slice(0, 5));
    currentTime.setHours(currentTime.getHours() + 1);
  }

  return availableHours;
};

const TimeSlider = ({ operatingHours, day, selectedDate, setSelectedTime }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [availableHours, setAvailableHours] = useState([]);
  const [allHours, setAllHours] = useState([]);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (!operatingHours || operatingHours.length === 0) {
      setIsClosed(true);
      return;
    }

    const scheduleForDay = operatingHours.find((schedule) => schedule.day === day.toUpperCase());

    if (scheduleForDay) {
      const now = new Date();
      const openingTime = scheduleForDay.opening_time;
      const closingTime = scheduleForDay.closing_time;
      const allAvailable = getAvailableHours(openingTime, closingTime);

      // Determine if the selected date is today
      const today = new Date();
      const selectedDay = new Date(selectedDate);
      const isToday = today.toDateString() === selectedDay.toDateString();

      // Filter hours based on the selected date
      const filteredHours = isToday
        ? allAvailable.filter(hour => {
            const [hours, minutes] = hour.split(':').map(Number);
            const hourTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
            return hourTime > (new Date(now.getTime() + 60 * 60 * 1000)) && hourTime < new Date(`1970-01-01T${closingTime}`);
          })
        : allAvailable;

      setAvailableHours(filteredHours);
      setAllHours(allAvailable);
      setIsClosed(false);
    } else {
      setIsClosed(true); // If there's no schedule for the selected day
    }
  }, [operatingHours, day, selectedDate]);

  useEffect(() => {
    setSelectedTime(selectedValue)
  }, [selectedValue, setSelectedTime]);

  return (
    <div className="py-4">
      <h4 className="text-md font-semibold mb-4">Select Available Time Slot:</h4>
      {isClosed ? (
        <p className="text-red-500 text-center">Barber is closed today.</p>
      ) : (
        <div className="flex flex-wrap justify-center ">
          {allHours.map((hour) => (
            <label
              key={hour}
              className={`flex items-center justify-center w-24 h-12 m-2 rounded-lg cursor-pointer border border-gray-300 ${
                availableHours.includes(hour) 
                  ? (selectedValue === hour ? 'bg-slate-700 text-white shadow-lg' : 'bg-white text-gray-700') 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              } transition-colors`}
            >
              <input
                type="radio"
                name="time"
                value={hour}
                checked={selectedValue === hour}
                onChange={() => availableHours.includes(hour) && setSelectedValue(hour) && setSelectedTime(hour)}
                className="sr-only"
              />
              {hour}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeSlider;
