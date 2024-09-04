import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import logoGold from '../../assets/images/logo-gold.png';
import {Button} from '@nextui-org/react';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import { useAuth } from '../../context/AuthContext';

const NavbarBarber = () => {
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

  const { user, error, loading, login, register, logout } = useAuth();



    return (
        <div
            className={`w-full flex justify-between px-64 py-8 bg-zinc-900 shadow-sm fixed top-0 z-50`}>
            <div className='flex gap-4'>
                <div className='flex gap-4'>
                    <Button as={Link} to="/"
                        className={`bg-transparent px-0 font-bold text-zinc-200`}>HOME</Button>
                </div>
                <div>
                    <Button as={Link} to="/about"
                        className={`bg-transparent px-0 font-bold text-zinc-200`}>ABOUT</Button>
                </div>
            </div>
            <div className='text-3xl font-extrabold'>
                <img src={logoGold} className='w-32 px-0 py-0 -mt-12 -mb-12' alt="logo"/>
            </div>
            <div className='flex gap-4'>
            {
            user ? (
              <>
                <div>
                    <Button as={Link} to={'/customer/profile'} className={`bg-transparent px-0 font-bold text-white`}>PROFILE</Button>
                </div>
                <div>
                <Button onClick={logout} variant='bordered' className={`bg-transparent px-0 font-bold text-white`}>LOGOUT</Button>
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

export default NavbarBarber