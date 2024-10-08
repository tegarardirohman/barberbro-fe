import React, { useEffect, useState } from 'react';
import Stats from '../components/dashboard/Stats';
import TransactionChart from '../components/dashboard/TransactionChart';
import { Card } from '@nextui-org/react';
import ServiceChart from '../components/dashboard/ServiceChart';
import { Rating } from 'react-simple-star-rating';
import useAxios from '../../hooks/useAxios';
import { format, getMonth, getYear } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

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

  bookings.forEach(booking => {
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
  
    console.log('Service Counts:', serviceCounts); // Tambahkan log di sini
  
    return Object.keys(serviceCounts).map(serviceName => ({
      name: serviceName,
      value: serviceCounts[serviceName]
    }));
  };


const StaffDashboard = () => {
  const { request } = useAxios();
  const [transaction, setTransaction] = useState([]);
  const {userDetail, refreshUserDetail} = useAuth();
  const [rating, setRating] = useState(0);

  useEffect(() => {

    if (userDetail) {
      setRating(userDetail.average_rating);
    } else {
      refreshUserDetail();
    }

  }, [userDetail]); 


  const [statitic1, setStatistic1] = useState({});
  const [statitic2, setStatistic2] = useState([]);

  // Fungsi untuk mengambil data transaksi
  const fetchTransaction = async () => {
    try {
      const res = await request('/bookings/current');
      console.log(res);
      setTransaction(res.data);
      setStatistic1(processBookingData(res.data));
      setStatistic2(processServiceData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);


  useEffect(() => {

    console.log(statitic2)
  }, [transaction]);


  return (
    <div className="flex flex-col px-8 py-4">
      <Stats />
      <div className="flex w-full mt-8 gap-4">
        <Card className='flex-1 p-8'>
          <TransactionChart title={'Transaction Chart'} label={statitic1.months} value={statitic1.count} />
        </Card>
        <div className="w-1/3 pl-2">
          <Card className='w-full p-4 mb-4'>
            <ServiceChart data={statitic2} />
          </Card>
          <Card className='w-full p-4'>
            <h2 className='text-xl font-bold mb-4'>Barber Rating</h2>
            <Rating initialValue={rating} size={32} readonly tooltipArray={[1, 2, 3, 4, 5]} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
