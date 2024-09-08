import React, { useEffect, useState } from 'react';
import Stats from '../../barber/components/dashboard/Stats';
import TransactionChart from '../../barber/components/dashboard/TransactionChart';
import { Card } from '@nextui-org/react';
import ServiceChart from '../../barber/components/dashboard/ServiceChart';
import { Rating } from 'react-simple-star-rating';
import { format, getMonth, getYear, getDay } from 'date-fns';
import useAxios from '../../hooks/useAxios';
import AdminStats from '../components/dashboard/AdminStats';

// Fungsi untuk mendapatkan nama bulan
const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex];
};

// Fungsi untuk memproses data booking
const processBookingData = (bookings) => {
  const monthCounts = {};

  const filteredBookings = bookings.filter(booking => booking.status !== 'Canceled' && booking.status !== 'Pending');

  filteredBookings.forEach(booking => {
    const date = new Date(booking.booking_date);
    const monthIndex = getMonth(date);
    const year = getYear(date);
    const monthYearKey = `${getMonthName(monthIndex)} ${year}`;

    if (monthCounts[monthYearKey]) {
      monthCounts[monthYearKey]++;
    } else {
      monthCounts[monthYearKey] = 1;
    }
  });

  const months = Object.keys(monthCounts);
  const count = months.map(month => monthCounts[month]);

  return {
    months,
    count
  };
};

// menghitung service statistic
  const processServiceData = (bookings) => {
    const serviceCounts = {};
  
    console.log(bookings)

    bookings.forEach(booking => {
      if (booking.services) {
        booking.services.forEach(service => {
          if (serviceCounts[service.service_name]) {
            serviceCounts[service.service_name] += 1;
          } else {
            serviceCounts[service.service_name] = 1;
          }
        });
      }
    });
  
    console.log('Service Counts:', serviceCounts); 
  
    return Object.keys(serviceCounts).map(serviceName => ({
      name: serviceName,
      value: serviceCounts[serviceName]
    }));
  };


  const processTrxByGender = (bookings) => {
    let male = 0;
    let female = 0;
  
    bookings.forEach((data) => {
      data.customer.is_male ? male++ : female++;
    });
  
    return [
      { name: "male", value: male },
      { name: "female", value: female }
    ];
  };



const AdminDashboard = () => {
  const { request } = useAxios();
  const [transaction, setTransaction] = useState([]);

  const [statitic1, setStatistic1] = useState({});
  const [statitic2, setStatistic2] = useState([]);
  const [trxDay, setTrxDay] = useState({});

  // get barber location
  const [barberLocation, setBarberLocation] = useState([]);
  const [trxByGender, setTrxByGender] = useState([]);



  // get barber data by day
  const getDayName = (dayIndex) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  };
  
  const processBookingDataByDay = (bookings) => {
    const dayCounts = {};
  
    const completedBookings = bookings.filter(booking => booking.status === 'Completed' || booking.status === 'Settlement');
  
    completedBookings.forEach(booking => {
      const date = new Date(booking.booking_date);
      const dayIndex = getDay(date); 
      const dayName = getDayName(dayIndex); 
  
      if (dayCounts[dayName]) {
        dayCounts[dayName]++;
      } else {
        dayCounts[dayName] = 1;
      }
    });
  
    const days = Object.keys(dayCounts); 
    const count = days.map(day => dayCounts[day]); 
  
    return {
      days,
      count
    };
  };



  // Fungsi untuk mengambil data transaksi
  const fetchTransaction = async () => {
    try {
      const res = await request('/bookings');
      console.log(res);
      setTransaction(res.data);
      setStatistic1(processBookingData(res.data));
      setStatistic2(processServiceData(res.data));
      setTrxDay(processBookingDataByDay(res.data));
      setTrxByGender(processTrxByGender(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);




  const mapBarbershopByRegion = (barbershops) => {
    const regionCounts = {};
  
    barbershops.forEach(barbershop => {
      const region = barbershop.state_province_region;
  
      if (regionCounts[region]) {
        regionCounts[region]++;
      } else {
        regionCounts[region] = 1;
      }
    });
  
    // Memetakan hasilnya ke dalam format yang diinginkan
    return Object.keys(regionCounts).map(region => ({
      name: region,
      value: regionCounts[region]
    }));
  };


    const fetchBarberLocation = async () => {
      try {
        const res = await request('/barbers');

        setBarberLocation(mapBarbershopByRegion(res.data));
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchBarberLocation();
    }, []);



  useEffect(() => {

    console.log(statitic2)
  }, [transaction]);



  // get transaction per days


  return (
    <div className="flex flex-col px-8 py-4 w-full">
      <AdminStats />

      <div className="flex w-full mt-8 gap-4">
        <Card className='flex-1 p-8'>
          <TransactionChart title="Monthly Transaction" label={statitic1.months} value={statitic1.count} />
        </Card>
        <div className="w-1/3 pl-2">
          <Card className='w-full p-4 mb-4'>
            <ServiceChart title="Transaction Per Region" data={barberLocation} />
          </Card>
        </div>
      </div>

      <div className="flex w-full mt-8 gap-8">

        <div className="w-1/3 pl-2">
          <Card className='w-full p-4 mb-4'>
            <ServiceChart title="Transaction Per Gender" data={trxByGender} />
          </Card>
        </div>

        <Card className='flex-1 p-8'>
          <TransactionChart title="Transaction Per Days" label={trxDay.days} value={trxDay.count} />
        </Card>
      </div>



    </div>
  );
};

export default AdminDashboard;
