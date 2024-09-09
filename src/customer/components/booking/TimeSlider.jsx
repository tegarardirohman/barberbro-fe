import React, { useState, useEffect } from 'react';

const TimeSlider = ({ availableBookingTime, selectedDate, setSelectedTime }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [availableHours, setAvailableHours] = useState([]);
  const [allHours, setAllHours] = useState([]);

  useEffect(() => {

    if (!availableBookingTime.available_time || availableBookingTime.available_time.length === 0) {
      return;
    }

    const now = new Date();
    const currentDate = now.toDateString(); // Get current date in string format
    const selectedDateObject = new Date(selectedDate).toDateString();

    if (availableBookingTime && selectedDateObject === currentDate) {
      const currentTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

      // Filter available hours based on current time with a 15-minute buffer
      const filteredAvailableHours = availableBookingTime.available_time.filter(hour => {
        const [hours, minutes] = hour.split(':').map(Number);
        const hourTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        return hourTime > currentTime && hourTime > new Date(currentTime.getTime() + 15 * 60000);
      });

      setAllHours(availableBookingTime.all_time);
      setAvailableHours(filteredAvailableHours);

    } else if (availableBookingTime) {
      // If selectedDate is not today, show all available hours
      setAllHours(availableBookingTime.all_time);
      setAvailableHours(availableBookingTime.available_time);
    }
  }, [availableBookingTime, selectedDate]);

  useEffect(() => {
    setSelectedTime(selectedValue);
  }, [selectedValue, setSelectedTime]);

  return (
    <div className="py-4">
      <h4 className="text-md font-semibold mb-4">Select Available Time Slot:</h4>
      <div className="flex flex-wrap justify-center">
        {allHours.map((hour) => (
          <label
            key={hour}
            className={`flex items-center justify-center w-24 h-12 m-2 rounded-lg cursor-pointer border border-gray-300
              ${
                availableHours.includes(hour)
                  ? (selectedValue === hour ? 'bg-slate-700 text-white shadow-lg' : 'bg-white text-gray-700')
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              } transition-colors
            `}
          >
            <input
              type="radio"
              name="time"
              value={hour}
              checked={selectedValue === hour}
              onChange={() => {
                if (availableHours.includes(hour)) {
                  setSelectedValue(hour);
                  setSelectedTime(hour);
                }
              }}
              className="sr-only"
            />
            {hour}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TimeSlider;
