import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import React from 'react'
import { IoExpandOutline } from 'react-icons/io5'
import { addOneHour } from '../../../utils/utils'
import { MdOutlineInfo } from 'react-icons/md'

const SlotScheduler = ({ data, handleModal }) => {

  return (
    <Card className='w-full py-1 px-4 border-1' shadow='none'>
        <CardHeader className='border-b-1'>
            <h2 className="text-lg font-bold w-full text-center py-2"> { data.booking_time } - { addOneHour(data.booking_time) } </h2>
        </CardHeader>
        <CardBody>
            <h3 className='font-bold pb-2'>Booking: </h3>

            {
                data.bookings.map((booking, index) => (
                    <div key={index} className="w-full flex justify-between items-center border-y-1 py-2">
                        <h4>{ booking?.customer.firstName + ' ' + booking?.customer.surname} </h4>  
                        <Button onClick={() => handleModal(booking)} className='px-1' color="primary"> <MdOutlineInfo size={20} /> </Button>
                    </div>
                ))
            }

        </CardBody>
    </Card>
  )
}

export default SlotScheduler