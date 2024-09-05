import React from 'react';
import Stats from '../components/dashboard/Stats';
import TransactionChart from '../components/dashboard/TransactionChart';
import { Card } from '@nextui-org/react';
import ServiceChart from '../components/dashboard/ServiceChart';
import { Rating } from 'react-simple-star-rating';

const StaffDashboard = () => {
  return (
    <div className="flex flex-col px-8 py-4">
     <Stats />

      <div className="flex w-full mt-8 gap-4">

        <Card className='flex-1 p-8'>
          <TransactionChart />
        </Card>

        <div className="w-1/3 pl-2">

          <Card className='w-full p-4 mb-4'>
           <ServiceChart />
          </Card>

          <Card className='w-full p-4'>
            <h2 className='text-xl font-bold mb-4'>Barber Rating</h2>
            <Rating initialValue={3.5} size={32} readonly tooltipArray={[1, 2, 3, 4, 5]} />
          </Card>

        </div>

      </div>

    </div>
  );
};

export default StaffDashboard;
