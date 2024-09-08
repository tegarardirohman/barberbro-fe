import React, { useEffect, useState } from 'react'
import StatItem from './StatItem'
import { FaCheck } from 'react-icons/fa'
import { GrTransaction } from 'react-icons/gr'
import { MdOutlineNextPlan } from "react-icons/md";
import { PiMoneyWavyThin } from 'react-icons/pi';
import { BiHappyBeaming } from 'react-icons/bi';
import { useAuth } from '../../../context/AuthContext';
import { convertDateToLong, rupiah } from '../../../utils/utils';
import useAxios from '../../../hooks/useAxios';

const Stats = () => {
  const [detail, setDetail] = useState({})
  const {userDetail} = useAuth()
  const { request } = useAxios();
  const [transaction, setTransaction] = useState([])


  const fetchData = async () => {
    try {
      const res = await request('/bookings/current')
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

  const getTransactionTommorrow = () => {
    let total = 0
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0);

    const filtered = transaction.filter(item => (item.booking_date === convertDateToLong(tomorrow)));

    return filtered.length
  }

  const getSuccessTransaction = () => {
    const filtered = transaction.filter(item => (item.status.toLowerCase() === "completed"));

    return filtered.length
  }

  return (
    <div className='w-full flex gap-8 justify-between'>
        <StatItem icon={<GrTransaction size={24} className='text-blue-400' />} name='Today Transactions' value={getTransactionToday() || 0} color='bg-white' />
        <StatItem icon={<MdOutlineNextPlan size={24} className='text-blue-400' />} name='Tommorrow Transactions' value={getTransactionTommorrow() || 0} color='bg-white' />
        <StatItem icon={<PiMoneyWavyThin size={24} className='text-blue-400' />} name='Total Balance' value={rupiah(detail.balance)} color='bg-white' />
        <StatItem icon={<BiHappyBeaming size={24} className='text-blue-400' />} name='Transactions Success' value={getSuccessTransaction() || 0} color='bg-white' />
    </div>
  )
}

export default Stats