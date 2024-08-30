import { Card, CardBody } from '@nextui-org/react';
import React from 'react';
import barberBanner from '../../assets/images/barber-banner.jpg';
import Tabregister from '../components/formRegister/TabRegister';


const RegisterBarber = () => {
  return (
    <div
      className="relative w-full h-screen py-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${barberBanner})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>
      
      <Card className='relative w-3/4 h-full mb-8 mx-auto' shadow='sm' radius='sm'>

        <CardBody className='p-0'>
            <Tabregister />
        </CardBody>

      </Card>

    </div>
  );
};

export default RegisterBarber;
