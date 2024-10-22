
export const convertLongToDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
}

export const convertDateToLong = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate.getTime();
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

    if (url === "/assets/images/barbershop/default.jpg") {
      return import.meta.env.VITE_IMAGE_URL + url;
    } else {
      return url;
    }

}

export const formatDistance = (distance) => {
    return `${distance.toFixed(2)} km`;
  };


  export const isBarbershopOpenToday = (operationalHours) => {
    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  
    const today = new Date();
    const todayDay = daysOfWeek[today.getDay()]; 
  
    const todayHours = operationalHours.find(hours => hours.day === todayDay);
  
    if (!todayHours) {
      return false;
    }
  
    const currentTime = today.getHours() + ":" + today.getMinutes();
  
    return currentTime >= todayHours.opening_time && currentTime <= todayHours.closing_time;
  };


  export const checkBarbershopStatus = (operationalHours) => {
    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    
    const today = new Date();
    const todayDayIndex = today.getDay(); // Mendapatkan indeks hari ini
    const todayDay = daysOfWeek[todayDayIndex]; // Mendapatkan nama hari (contoh: "MONDAY")
    
    // Mencari jam operasional yang sesuai dengan hari ini
    const todayHours = operationalHours.find(hours => hours.day === todayDay);
    const currentHours = today.getHours().toString().padStart(2, '0');
    const currentMinutes = today.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;
    
    // Jika barbershop buka hari ini dan saat ini berada dalam jam operasional
    if (todayHours) {
      if (currentTime >= todayHours.opening_time && currentTime <= todayHours.closing_time) {
        return `OPEN - Closed at ${todayHours.closing_time}.`;
      } else if (currentTime < todayHours.opening_time) {
        return `CLOSED - Opens at ${todayHours.opening_time}.`;
      }
    }
  
    // Jika barbershop tutup, cari hari selanjutnya kapan buka
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (todayDayIndex + i) % 7; // Menemukan hari berikutnya
      const nextDay = daysOfWeek[nextDayIndex];
      
      const nextDayHours = operationalHours.find(hours => hours.day === nextDay);
      if (nextDayHours) {
        return `CLOSED - Opens at ${nextDay}, ${nextDayHours.opening_time}`;
      }
    }
  
    return "NOT OPEN";
  };
  

  export const getDayName = (date) => {
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };


  export const compareLongDates = (a, b) => {
    const date1 = new Date(a);
    const date2 = new Date(b);
    
    
    return(
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate());
  }