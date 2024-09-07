import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Input } from '@nextui-org/react';

const OperationalHoursInput = ({ operationalHours, setOperationalHours }) => {
  const { control } = useForm();

  const handleCheckboxChange = (dayValue, isChecked) => {
    setOperationalHours((prev) => {
      if (isChecked) {
        const updatedHours = prev.filter((hour) => hour.day !== dayValue);
        return [...updatedHours, { day: dayValue, opening_time: '', closing_time: '', limit_per_session: 0 }];
      } else {
        return prev.filter((hour) => hour.day !== dayValue);
      }
    });
  };

  const handleTimeChange = (day, type, value) => {
    setOperationalHours((prev) =>
      prev.map((hour) =>
        hour.day === day ? { ...hour, [type]: value } : hour
      )
    );
  };

  const isChecked = (day) => operationalHours.some((hour) => hour.day === day);

  const getTimeValue = (day, type) =>
    operationalHours.find((hour) => hour.day === day)?.[type] || '';

  return (
    <>
      {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map(
        (day, index) => (
          <div key={index} className="flex gap-4 w-full justify-between">
            <Checkbox
              isSelected={isChecked(day)}
              checked={isChecked(day)}
              id={day}
              className="flex-1 mr-auto capitalize"
              onChange={(e) => handleCheckboxChange(day, e.target.checked)}
            >
              {day.toLowerCase()}
            </Checkbox>

            <Controller
              name={`${day}-opening_time`}
              control={control}
              render={({ field }) => (
                <Input
                  type="time"
                  id={`${day}-opening_time`}
                  label="Open"
                  className="w-1/4"
                  value={getTimeValue(day, 'opening_time')}
                  onChange={(e) => {
                    field.onChange(e);
                    handleTimeChange(day, 'opening_time', e.target.value);
                  }}
                  disabled={!isChecked(day)}
                />
              )}
            />

            <Controller
              name={`${day}-closing_time`}
              control={control}
              render={({ field }) => (
                <Input
                  type="time"
                  id={`${day}-closing_time`}
                  label="Close"
                  className="w-1/4"
                  value={getTimeValue(day, 'closing_time')}
                  onChange={(e) => {
                    field.onChange(e);
                    handleTimeChange(day, 'closing_time', e.target.value);
                  }}
                  disabled={!isChecked(day)}
                />
              )}
            />

            <Controller
              name={`${day}-limit_per_session`}
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  id={`${day}-limit_per_session`}
                  label="Limit per Session"
                  className="w-1/5"
                  value={getTimeValue(day, 'limit_per_session')}
                  onChange={(e) => {
                    field.onChange(e);
                    handleTimeChange(day, 'limit_per_session', e.target.value);
                  }}
                  disabled={!isChecked(day)}
                />
              )}
            />
          </div>
        )
      )}
    </>
  );
};

export default OperationalHoursInput;
