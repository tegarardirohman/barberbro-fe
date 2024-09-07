import React from 'react'
import StatItem from './StatItem'
import { FaCheck } from 'react-icons/fa'
import { GrTransaction } from 'react-icons/gr'
import { MdOutlineNextPlan } from "react-icons/md";
import { PiMoneyWavyThin } from 'react-icons/pi';
import { BiHappyBeaming } from 'react-icons/bi';

const Stats = () => {
  return (
    <div className='w-full flex gap-8 justify-between'>
        <StatItem icon={<GrTransaction size={24} className='text-blue-400' />} name='Today Transactions' value={14} color='bg-white' />
        <StatItem icon={<MdOutlineNextPlan size={24} className='text-blue-400' />} name='Tommorrow Transactions' value={8} color='bg-white' />
        <StatItem icon={<PiMoneyWavyThin size={24} className='text-blue-400' />} name='Total Balance' value={"9.800.000"} color='bg-white' />
        <StatItem icon={<BiHappyBeaming size={24} className='text-blue-400' />} name='Transactions Success' value={224} color='bg-white' />
    </div>
  )
}

export default Stats