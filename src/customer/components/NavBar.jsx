import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import logoWhite from '../../assets/images/logo-white.png';
import logoGold from '../../assets/images/logo-gold.png';
import logoBlack from '../../assets/images/logo-black.png';
import { Button } from '@nextui-org/react';

const NavBar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);
  
  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };


  return (
    <div className={`fixed top-0 left-0 w-full flex z-50 justify-between px-64 py-8 ${scrolling ? 'bg-white text-black shadow-sm' : 'bg-transparent text-white'}`}>
        <div className='flex gap-4'>
            <div className='flex gap-4'>
              <Button className={`bg-transparent px-0 font-bold ${scrolling ? 'text-black' : 'text-white'}`}>HOME</Button>
            </div>
            <div>
            <Button className={`bg-transparent px-0 font-bold ${scrolling ? 'text-black' : 'text-white'}`}>ABOUT</Button>
            </div>
        </div>
        <div className='text-3xl font-extrabold'>
            <img src={scrolling ? logoBlack : logoGold} className='w-32 px-0 py-0 -mt-12 -mb-12' alt="logo" />
        </div>
        <div className='flex gap-4'>
            <div>
              <ModalLogin props={scrolling} />
            </div>
            <div>
              <ModalRegister props={scrolling} />
            </div>
        </div>
    </div>
  )
}

export default NavBar