import React, { useEffect } from 'react'
import FormProfile from '../components/profile/FormProfile'
import { Card } from '@nextui-org/react'
import { useAuth } from '../../context/AuthContext';
import { getImageUrl } from '../../utils/utils';

const StaffProfile = () => {
  const { userDetail, refreshUserDetail } = useAuth();

  useEffect(() => {
    refreshUserDetail();
    console.log(userDetail)
  }, [])

  return (
    <div className='w-full px-8'>
      <h1 className='text-xl font-bold pt-4'>Barber Profile</h1>
      <div className="w-full flex justify-between gap-4 mt-8">

        <div className="w-full">

          {/* profile picture */}
          <Card className='w-full p-4 flex flex-row gap-8'>
            <div>
              <div className='w-32 aspect-square rounded-full bg-red-400 hover:backdrop-blur' onClick={() => document.getElementById('imageInput').click()}>
                <img src={getImageUrl(userDetail?.barbershop_profile_picure_id?.path)} alt="test" />
              </div>
            </div>

            <div>
              <h3>Barber Email</h3>
              <p>{userDetail?.name}</p>
            </div>


          </Card>

          {/* user detail */}
          <Card className='w-full p-4'>
            <h3>Profile Picture</h3>
            <div className='w-32 aspect-square rounded-full bg-red-400'>

            </div>
          </Card>


        </div>


        <Card className='w-full p-4'>
          <h3>Barber Location</h3>
        </Card>

      </div>



      {/* <FormProfile /> */}
    </div>
  )
}

export default StaffProfile