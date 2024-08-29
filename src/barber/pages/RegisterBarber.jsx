import { Button, Card, CardBody } from '@nextui-org/react';
import React from 'react';
import barberBanner from '../../assets/images/barber-banner.jpg';
import { Link } from 'react-router-dom';
import Tabregister from '../components/TabRegister';
import MapInput from '../components/formRegister/MapInput';
import { FaArrowLeft } from 'react-icons/fa6';


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
            {/* <MultiStepForm /> */}
        </CardBody>

      </Card>

    </div>
  );
};

export default RegisterBarber;
