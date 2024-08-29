import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import ModalLogin from '../../customer/components/ModalLogin.jsx';
import ModalRegister from '../../customer/components/ModalRegister.jsx';
import logoWhite from '../../assets/images/logo-white.png';
import logoGold from '../../assets/images/logo-gold.png';
import logoBlack from '../../assets/images/logo-black.png';
import {Button} from '@nextui-org/react';

export const NavbarBarber = () => {
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
        <div
            className={`w-full flex justify-between px-64 py-8 bg-zinc-900 shadow-sm`}>
            <div className='flex gap-4'>
                <div className='flex gap-4'>
                    <Button
                        className={`bg-transparent px-0 font-bold text-zinc-200`}>HOME</Button>
                </div>
                <div>
                    <Button
                        className={`bg-transparent px-0 font-bold text-zinc-200`}>ABOUT</Button>
                </div>
            </div>
            <div className='text-3xl font-extrabold'>
                <img src={logoGold} className='w-32 px-0 py-0 -mt-12 -mb-12' alt="logo"/>
            </div>
            <div className='flex gap-4'>
                <div>
                    <ModalLogin props={scrolling}/>
                </div>
                <div>
                    <ModalRegister props={scrolling}/>
                </div>
            </div>
        </div>
    )
}