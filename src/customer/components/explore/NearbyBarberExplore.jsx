import { Button } from '@nextui-org/react'
import React from 'react'

const NearbyBarberExplore = ({ datas }) => {
  return (
    <div className='max-w-screen-2xl mx-auto px-20 mt-8'>
        <div className="w-full flex justify-between">
            <h2 className='text-xl font-bold'>Nearby Barber</h2>
            <Button className='w-24 bg-slate-800 text-slate-100 px-4' size='sm' color='default'>Get Location</Button>
        </div>
    </div>
  )
}

export default NearbyBarberExplore