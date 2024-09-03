import React from 'react'

const RowComponent = ({name, value}) => {
  return (
    <div className='flex flex-row gap-1 border-t-1 last:border-b-1 border-slate-200 justify-between py-4'>
        <p className='text-zinc-700'>{name}</p>
        <p className='font-bold'>{value}</p>
    </div>
  )
}

export default RowComponent