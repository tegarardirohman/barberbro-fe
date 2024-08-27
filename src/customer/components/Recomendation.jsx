import { Card, Image } from '@nextui-org/react'
import React from 'react'
import img from '../../assets/images/barber-bg-vector.jpg'

const Recomendation = () => {

  return (
    <div className='w-full px-56 py-24'>
        <h2 className='text-2xl font-bold uppercase mb-8'>Recomendation</h2>

        {/* Card */}
        <div className="w-full flex gap-8">

            <Card className='p-4 w-96'>
                <img src={img} alt="barber" className="w-full rounded-lg aspect-square object-cover"/>
                <div>
                    <h1 className="text-2xl font-bold">Barber 1</h1>
                    <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quae.</p>
                </div>
            </Card>



        </div>
        {/* Card */}
    </div>
  )
}

export default Recomendation