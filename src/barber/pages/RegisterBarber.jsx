import { Button, Card, CardBody } from '@nextui-org/react';
import React from 'react';
import barberBanner from '../../assets/images/barber-banner.jpg';
import { Link } from 'react-router-dom';
import Tabregister from '../components/TabRegister';
import MapInput from '../components/MapInput';


const RegisterBarber = () => {
  return (
    <div
      className="relative w-full h-screen py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${barberBanner})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>
      
      <Card className='relative py-4 px-8 w-2/3 h-full mb-8 mx-auto' shadow='sm' radius='sm'>
        {/* <div className='flex items-center justify-between w-full'>
            <Button as={Link} to={'/'}>Back</Button>
            <h2 className='text-xl font-bold'>Register Barber</h2>
        </div>
        <h2 className='text-xl font-bold py-6 text-white'>Register</h2> */}

        <MapInput />

        <CardBody>
            <Tabregister />
        </CardBody>

      </Card>

    </div>
  );
};

export default RegisterBarber;
