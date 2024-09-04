import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import logoWhite from '../../assets/images/logo-white.png';
import logoGold from '../../assets/images/logo-gold.png';
import logoBlack from '../../assets/images/logo-black.png';
import { Button } from '@nextui-org/react';
import { useAuth } from '../../context/AuthContext';

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

  // useContext
  const { user, error, loading, login, register, logout } = useAuth();

  console.log(user)


  return (
    <div className={`fixed top-0 left-0 w-full flex z-50 justify-between px-64 py-8 ${scrolling ? 'bg-white text-black shadow-sm' : 'bg-transparent text-white'}`}>
        <div className='flex gap-4'>
            <div className='flex gap-4'>
              <Button as={Link} to={'/'} className={`bg-transparent px-0 font-bold ${scrolling ? 'text-black' : 'text-white'}`}>HOME</Button>
            </div>
            <div>
            <Button as={Link} to={'/about'} className={`bg-transparent px-0 font-bold ${scrolling ? 'text-black' : 'text-white'}`}>ABOUT</Button>
            </div>
        </div>
        <div className='text-3xl font-extrabold'>
            <img src={scrolling ? logoBlack : logoGold} className='w-32 px-0 py-0 -mt-12 -mb-12' alt="logo" />
        </div>
        <div className='flex gap-4'>

          {
            user ? (
              <>
                <div>
                    <Button as={Link} to={'/customer/profile'} className={`bg-transparent px-0 font-bold ${scrolling ? 'text-black' : 'text-white'}`}>PROFILE</Button>
                </div>
                <div>
                <Button onClick={logout} variant='bordered' className={`bg-transparent px-0 font-bold ${scrolling ? 'text-black' : 'text-white'}`}>LOGOUT</Button>
              </div>
              </>
            ) : (
              <>
                <div>
                  <ModalLogin props={scrolling} />
                </div>
                <div>
                  <ModalRegister props={scrolling} />
                </div>
              </>
            )
          }



        </div>
    </div>
  )
}

export default NavBar