
export const convertLongToDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
}

export const convertDateToLong = (date) => {
    const newDate = new Date(date);
    return newDate.setHours(0, 0, 0, 0);
}

export function addOneHour(timeString) {
    // Split the time string into hours and minutes
    let [hours, minutes] = timeString.split(':').map(Number);
  
    // Add one hour
    hours += 1;
  
    // Handle overflow if hours exceed 23 (reset to 00)
    if (hours === 24) {
      hours = 0;
    }
  
    // Convert hours and minutes back to strings with leading zeros if needed
    const newHours = hours.toString().padStart(2, '0');
    const newTimeString = `${newHours}:${minutes.toString().padStart(2, '0')}`;
  
    return newTimeString;
}

export const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

export const getImageUrl = (url) => {
    return import.meta.env.VITE_IMAGE_URL + url;
}