import React, { useEffect, useState } from 'react'
import StatItem from './StatItem'
import { FaCheck } from 'react-icons/fa'
import { GrTransaction } from 'react-icons/gr'
import { MdOutlineNextPlan } from "react-icons/md";
import { PiMoneyWavyThin } from 'react-icons/pi';
import { BiHappyBeaming } from 'react-icons/bi';
import useAxios from '../../../hooks/useAxios';
import { useAuth } from '../../../context/AuthContext';
import { convertDateToLong, rupiah } from '../../../utils/utils';

const AdminStats = () => {
  const [detail, setDetail] = useState({})
  const {userDetail} = useAuth()
  const { request } = useAxios();
  const [transaction, setTransaction] = useState([])


  const fetchData = async () => {
    try {
      const res = await request('/bookings')
      setTransaction(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setDetail(userDetail)
    fetchData()
  }, [userDetail])

  // get total transaction
  const getTotalTransaction = () => {
    let total = 0
    transaction.forEach(item => {

      if (item.status.toLoweCase() !== 'canceled')
      total += item.total_price
    })
    return total
  }

  // get trancastion today
  const getTransactionToday = () => {
    let total = 0
    const today = convertDateToLong(new Date())

    const filtered = transaction.filter(item => (item.booking_date === today));
    return filtered.length
  }


//   get total balance
  const getTotalBalance = () => {

    let total = 0
    transaction.forEach(item => {
        if((item.status === 'Settlement') || (item.status === 'Completed')) {
            total += item.total_price
        }
    })
    return total
  }

//   get total Barber
  const [totalBarber, setTotalBarber] = useState(0)

  useEffect(() => {
    const fetchTotalBarber = async () => {
      try {
        const res = await request('/barbers')
        setTotalBarber(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTotalBarber()
  }, [])

//   get total user
  const [totalUser, setTotalUser] = useState(0)

  useEffect(() => {
    const fetchTotalUser = async () => {
      try {
        const res = await request('/customers')
        setTotalUser(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTotalUser()
  }, [])


  return (
    <div className='w-full flex gap-8 justify-between'>
        <StatItem icon={<GrTransaction size={24} className='text-blue-400' />} name='Today Transactions' value={getTransactionToday() || 0} color='bg-white' />
        <StatItem icon={<PiMoneyWavyThin size={24} className='text-blue-400' />} name='Total Balance' value={rupiah(getTotalBalance())} color='bg-white' />
        <StatItem icon={<MdOutlineNextPlan size={24} className='text-blue-400' />} name='Total Barbers' value={totalBarber} color='bg-white' />
        <StatItem icon={<BiHappyBeaming size={24} className='text-blue-400' />} name='Total Users' value={totalUser} color='bg-white' />
    </div>
  )
}

export default AdminStats