import React from 'react';
import ReactPlayer from 'react-player';
import heroSrc from '../../assets/videos/horizontal_.webm';
import TopNavbar from './TopNavbar';
import NavBar from './NavBar';
import { Button } from '@nextui-org/react';
import { FaArrowRight } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';

const Hero = () => {
  return (
    <div className='relative w-full h-screen'>
      {/* Navbar di atas video */}
      {/* <TopNavbar /> */}
      <NavBar />

      <ReactPlayer 
        url={heroSrc} 
        width='100%' 
        height='100%'
        playing 
        loop 
        muted 
        controls={false} 
        className='react-player absolute top-0 left-0 w-full h-full object-cover' 
      />

      {/* Overlay */}
      <div className="overlay-gradient"></div>

      {/* Konten di atas overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-start">
        <div className='text-center'>
            <h1 className="text-8xl font-extrabold">Barberbro <br/>for Everyone</h1>
            <p className="mt-4 mb-12 text-lg">Effortless Scheduling for Barbers, Seamless Booking for Clients</p>

            <Button className='px-10 py-4 text-black bg-gold' size='lg' radius='sm' variant='flat'>Get Started <FaChevronRight className='ml-2' /> </Button>
        </div>

        {/* Anda bisa menambahkan komponen lain di sini */}
      </div>
    </div>
  );
};

export default Hero;
