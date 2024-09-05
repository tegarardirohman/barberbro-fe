import React from 'react'
import NavBar from '../NavBar'
import ReactPlayer from 'react-player'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import bgExplore from '../../../assets/images/bg-explore.jpg'

const HeroExplore = ({ setSearch, setDay, onSearch }) => {
  return (
    <div className='relative w-full h-screen'>
    <NavBar />

    <div className='absolute top-0 left-0 w-full h-full bg-cover bg-center' style={{ backgroundImage: `url(${bgExplore})` }}></div>

    {/* Overlay */}
    <div className="overlay"></div>

    {/* Konten di atas overlay */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-start w-screen">
      <div className='text-center'>
          <h1 className="text-6xl font-extrabold">Explore Barberbro</h1>
          <p className="mt-4 mb-12 text-lg">Lets find the best barber for you</p>
      </div>
            <div className='flex flex-row gap-4 justify-center w-full px-[34rem] sticky text-black'>
                <Input size='lg' radius="sm" variant='flat' type="text" placeholder="Barber name" className='w-5xl' onChange={(e) => setSearch(e.target.value)}/>
                {/* <Select size='sm' label="Select Days" onChange={(e) => setDay(e.target.value)}>
                    <SelectItem value="SUNDAY">Sunday</SelectItem>
                    <SelectItem value="MONDAY">Monday</SelectItem>
                    <SelectItem value="TUESDAY">Tuesday</SelectItem>
                    <SelectItem value="WEDNESDAY">Wednesday</SelectItem>
                    <SelectItem value="THURSDAY">Thursday</SelectItem>  
                    <SelectItem value="FRIDAY">Friday</SelectItem>
                    <SelectItem value="SATURDAY">Saturday</SelectItem>
                </Select> */}
                <Button className="bg-gold text-black" size='lg' onClick={onSearch}>Search</Button>
          </div>
    </div>
  </div>
  )
}

export default HeroExplore