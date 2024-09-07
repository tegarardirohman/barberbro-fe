import React from 'react'

const ProfileItem = ({ icon, name, value }) => {
  return (
    <div className="w-full flex justify-between items-bottom gap-4">
        <div className="w-14 aspect-square bg-slate-100 flex items-center justify-center rounded-lg mb-4"> { icon } </div>
        <div className='flex-1'>
            <div className="w-full text-sm font-light pt-1"> { name } </div>
            <div className="w-full text-md font-bold"> { value } </div>
        </div>
    </div>
  )
}

export default ProfileItem