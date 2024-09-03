import React from 'react'

const LittleStatItem = ({icon, color, title, value}) => {
  return (
    <div className='py-4 px-0 flex gap-3 border-e-2 last:border-e-0 w-full'>
        <div className={`w-14 aspect-square flex items-center justify-center rounded-lg bg-${color}-400 text-${color}-200 text-2xl`}>
            { icon }
        </div>
        <div>
            <h3 className='font-thin'> {title} </h3>
            <p className='font-bold text-2xl'> {value} </p>
        </div>
    </div>
  )
}

export default LittleStatItem