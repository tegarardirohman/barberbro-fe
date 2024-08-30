import { Button, Card, Input } from '@nextui-org/react'
import React from 'react'
import BankCards from '../components/withdraw/BankCards'
import { PiHandWithdrawFill, PiHandWithdrawLight } from 'react-icons/pi'
import { FaChevronCircleDown } from 'react-icons/fa'

const StaffWithDraw = () => {
  return (
    <div className='flex gap-4 px-4 py-4 w-full'>

        {/* right */}
        <Card className='w-full p-4'>
        <h2 className='text-xl font-bold'>Withdraw</h2>

        <div className="flex w-full gap-4">

            <Card shadow='none' className='w-full px-4 py-4 border-1 mt-4'>

                <Card className='px-8 py-6 border-1 bg-gold mb-7 relative'>
                    <h2 className='font-light'>Balance</h2>
                    <p className='text-4xl font-bold'>Rp. 100.000</p>
                </Card>

                <Input
                    bordered
                    label="Amount"
                    type="number"
                    placeholder="Amount"
                    labelPlacement='outside'
                    labelPlaceholder="Amount"
                    className='w-full mt-8'
                />

                <p className='text-sm pt-20 pr-8'>Ready to claim your earnings? Click the button below to withdraw your funds.</p>

                <Button className='w-full mt-4 bg-slate-800 text-slate-100' size='lg' color='default'>Withdraw</Button>


            </Card>

            {/* form withdraw */}
            <Card shadow='none' className='w-full p-4 border-1 mt-4'>
                <BankCards />
            </Card>



        </div>
            
        </Card>

            {/* Account */}
        <Card className='w-2/5 p-4'>
            <h2 className='text-xl font-bold mb-4'>History</h2>

            
            <Card shadow='none' className='w-full p-4 border-1 mb-2 flex flex-row justify-between items-center'>
               <div className='flex flex-row gap-4'>
                    <FaChevronCircleDown size={8} className='w-12 h-12 bg-slate-300 rounded-lg p-4'/>
                    <div>
                        <p className='text-slate-800 font-bold'>Withdraw From balance</p>
                        <p className='text-slate-800 font-light text-sm'>29-09-2024</p>
                    </div>
               </div>
               <p className='text-red-600'>Rp. 100.000</p>
            </Card>



        </Card>

    </div>
  )
}

export default StaffWithDraw