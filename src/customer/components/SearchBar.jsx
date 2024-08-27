import { Button, Card, Input } from '@nextui-org/react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='relative w-full text-white p-4 bg-[url("../assets/images/barber-bg-vector.jpg")]'>
        <div className='mx-auto py-12 px-[20%]'>
            <h2 className='text-6xl font-bold text-center text-amber-50 uppercase pt-20 pb-8'>more than 100 barbers</h2>
            <div className="p-2 w-full px-32 flex gap-2 items-center">
                <Input className="p-2 text-white" size='lg' type="text" placeholder="Barber name"/>
                <Input className="p-2 text-white" size='lg' type="text" placeholder="Barber location"/>
                <Button className="p-2 bg-gold text-black" size='lg'>Search</Button>
            </div>
        </div>

    </div>
  )
}

export default SearchBar