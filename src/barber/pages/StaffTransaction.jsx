import { Card } from '@nextui-org/react'
import React from 'react'
import Scheduler from '../components/scheduler/Scheduler'
import SlotScheduler from '../components/scheduler/SlotScheduler'

const StaffTransaction = () => {
  return (
    <div className='flex px-4 w-full'>
        <div className='w-full py-4 px-4 flex flex-col gap-4' shadow='none'>
        
            <Card className='w-full py-4 px-4'>
                <Scheduler />
            </Card>

            <Card className='w-full max-w-full py-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

                <SlotScheduler />
                <SlotScheduler />
                <SlotScheduler />
                <SlotScheduler />
                <SlotScheduler />
                <SlotScheduler />

            </Card>

        </div>
    </div>
  )
}

export default StaffTransaction