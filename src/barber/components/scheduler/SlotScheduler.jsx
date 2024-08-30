import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'
import { IoExpandOutline } from 'react-icons/io5'

const SlotScheduler = () => {
  return (
    <Card className='w-full py-1 px-4 border-1' shadow='none'>
        <CardHeader className='border-b-1'>
            <h2 className="text-lg font-bold w-full text-center py-2">11:00 - 12:00</h2>
        </CardHeader>
        <CardBody>
            <h3 className='font-bold pb-2'>Booking: </h3>

            <div className="w-full flex justify-between items-center border-y-1 py-2">
                <h4>Tegar Ardi Rohman</h4>  
                <Button className='px-1' color="primary"> <IoExpandOutline /> </Button>
            </div>

            <div className="w-full flex justify-between items-center border-y-1 py-2">
                <h4>Rey Wijaya</h4>  
                <Button className='px-1' color="primary"> <IoExpandOutline /> </Button>
            </div>


        </CardBody>
    </Card>
  )
}

export default SlotScheduler