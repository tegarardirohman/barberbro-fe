import { Button, Card } from '@nextui-org/react'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { HiDotsVertical } from "react-icons/hi";

const StatItem = ({ icon, name, value, color }) => {
  return (
    <Card className={`w-full p-8 border-1 ${color}`} shadow='sm'>
        <button className='absolute top-4 right-4 p-2 bg-' radius='full'> <FaArrowRight /> </button>
        <div className="w-14 aspect-square bg-slate-50 flex items-center justify-center rounded-lg mb-4"> { icon } </div>
        <div className="w-full text-5xl font-bold"> { value } </div>
        <div className="w-full text-md font-light pt-1"> { name } </div>
    </Card>
  )
}

export default StatItem