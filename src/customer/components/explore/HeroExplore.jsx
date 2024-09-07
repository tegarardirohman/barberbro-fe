import React from 'react'
import NavBar from '../NavBar'
import ReactPlayer from 'react-player'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import bgExplore from '../../../assets/images/bg-explore.jpg'

const HeroExplore = ({ setSearch, day, setDay, onSearch, onReset }) => {


  const handleDayChange = (e) => {
    setDay(e.target.value)
  }

  return (
    <div className='relative w-full h-screen'>
    <NavBar />

    <div className='absolute top-0 left-0 w-full h-full bg-cover bg-center' style={{ backgroundImage: `url(${bgExplore})` }}></div>

    {/* Overlay */}
    <div className="overlay"></div>

    {/* Konten di atas overlay */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-start w-screen pt-20">
      <div className='text-center'> 
          <h1 className="text-6xl font-extrabold">Explore Barberbro</h1>
          <p className="mt-4 mb-12 text-lg">Lets find the best barber for you</p>
      </div>
            <div className='flex lg:flex-row flex-col gap-4 justify-center w-full max-w-screen-lg sticky text-black'>
                <Input size='lg' radius="sm" variant='flat' type="text" placeholder="Barber name" className='w-5xl' onChange={(e) => setSearch(e.target.value)}/>
                <Select size='sm' label="Select Days" onChange={handleDayChange} selectedKeys={[day]}>
                    <SelectItem key="SUNDAY" value="SUNDAY">Sunday</SelectItem>
                    <SelectItem key="MONDAY" value="MONDAY">Monday</SelectItem>
                    <SelectItem key="TUESDAY" value="TUESDAY">Tuesday</SelectItem>
                    <SelectItem key="WEDNESDAY" value="WEDNESDAY">Wednesday</SelectItem>
                    <SelectItem key="THURSDAY" value="THURSDAY">Thursday</SelectItem>  
                    <SelectItem key="FRIDAY" value="FRIDAY">Friday</SelectItem>
                    <SelectItem key="SATURDAY" value="SATURDAY">Saturday</SelectItem>
                </Select>
                <Button className="bg-gold text-black" size='lg' onClick={onReset}>Reset</Button>
          </div>
    </div>
  </div>
  )
}

export default HeroExplore