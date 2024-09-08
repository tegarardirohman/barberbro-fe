import React, { useEffect, useState } from 'react'
import FormProfile from '../components/profile/FormProfile'
import { Button, Card } from '@nextui-org/react'
import { useAuth } from '../../context/AuthContext';
import { getImageUrl } from '../../utils/utils';
import ProfileItem from '../components/profile/ProfileItem';
import { MdCall, MdFacebook, MdOutlinePerson } from 'react-icons/md';
import GoogleMapsEmbed from '../../customer/components/googleMap/GoogleMapsEmbed';
import { IoLogoTiktok } from 'react-icons/io5';
import { FaInstagram, FaRegAddressCard } from 'react-icons/fa';
import { PiCityDuotone, PiFileZip } from 'react-icons/pi';
import { FaMountainCity } from 'react-icons/fa6';
import { GiIsland } from "react-icons/gi";
import ModalBarberDetail from '../components/profile/ModalBarberDetail';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import validationSchema from "../components/formRegister/validationSchema";
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import ModalBarberProfile from '../components/profile/ModalBarberProfile';
import ModalBarberSocmed from '../components/profile/ModalBarberSocmed';
import ModalBarberLocation from '../components/profile/ModalBarberLocation';
import { toast } from 'react-toastify';

const StaffProfile = () => {
  const { userDetail, refreshUserDetail } = useAuth();

  // barber detail

  const [data, setData] = useState(null);

  const [address, setAddress] = useState(null);
  const [socialMedia, setSocialMedia] = useState([
    { platform_name: "Facebook", platform_url: "" },
    { platform_name: "Instagram", platform_url: "" },
    { platform_name: "TikTok", platform_url: "" },
  ]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      id: "",
      name: "",
      contact_number: "",
      email: "",
      password: "",
      role: "string",
      city: "",
      street_address: "",
      state_province_region: "",
      postal_zip_code: "",
      country: "",
      latitude: "",
      longitude: "",
      description: "",
      barbershop_profile_picture_id: {
        id: "",
        name: "",
        path: "",
        size: 0,
        contentType: "",
        createdAt: 0,
        updatedAt: 0,
      },
    },
    mode: "onBlur",
  });

  const { response, error, loading, request } = useAxios();
  const navigate = useNavigate();


  useEffect(() => {
    refreshUserDetail();
    setAddress(userDetail?.address);
    console.log(userDetail)
  }, [])


  // fetch data

  const fetchData = async () => {
    try {
      const res = await request("/barbers/current");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async () => {
    trigger();

    const data = getValues();

    try {
      const res = await request("/barbers/current", "PUT", data);

      if (res.statusCode === 200) {
        toast.success("Profile successfully updated");
        refreshUserDetail();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setValue("id", data.id);
      setValue("barbershop_profile_picture_id", data.barbershop_profile_picture_id);
      setValue("name", data.name);
      setValue("contact_number", data.contact_number);
      setValue("email", data.email);
      setValue("description", data.description);
      setValue("street_address", data.street_address);
      setValue("city", data.city);
      setValue("state_province_region", data.state_province_region);
      setValue("country", data.country);
      setValue("latitude", data.latitude);
      setValue("longitude", data.longitude);
      setValue("password", data.password);
      fetchZipCode(data.latitude, data.longitude);
    }
  }, [data]);

  useEffect(() => {
    if (address) {
      const addressToSet = `${address?.address?.road || ""} ${
        address?.address?.neighbourhood || ""
      }`;
      setValue("street_address", addressToSet);
      setValue("city", address.address?.city);
      setValue("state_province_region", address.address?.state);
      setValue("country", address?.address.country);
      setValue("latitude", address?.latitude);
      setValue("longitude", address?.longitude);
      // fetchZipCode(address?.latitude, address?.longitude);
    }
  }, [address]);

  const fetchZipCode = async (lat, long) => {
    try {
      const res = await request(
        `https://kodepos.vercel.app/detect/?latitude=${lat}&longitude=${long}`
      );

      setValue("postal_zip_code", res?.code?.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSocialMediaChange = (index, e) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index].platform_url = e.target.value;
    setSocialMedia(updatedSocialMedia);
    setValue("social_media", updatedSocialMedia);
  };


  return (
    <div className='w-full px-8 mb-10'>
      <h1 className='text-xl font-bold pt-4'>Barber Profile</h1>
      <div className="w-full flex justify-between gap-4 mt-8">

        <div className="w-full">
          {/* profile picture */}
          <Card className='w-full p-8 flex flex-row gap-8 border-1' shadow='none'>
            <div>
              <div className='w-32 aspect-square rounded-full hover:backdrop-blur cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-slate-100' onClick={() => document.getElementById('imageInput').click()}>
                <img src={getImageUrl(userDetail?.barbershop_profile_picture_id?.path)} alt="test" className='w-full aspect-square rounded-full' />
              </div>
            </div>

            <div className='pt-4'>
              <h3 className='font-light font-slate-300'>Barber Email</h3>
              <p>{userDetail?.email}</p>
            </div>


            <ModalBarberProfile image={getImageUrl(userDetail?.barbershop_profile_picture_id?.path)} control={control} errors={errors} onSubmit={onSubmit} setValue={setValue} />

          </Card>

          {/* user detail */}
          <Card className='w-full p-8 mt-4 border-1' shadow='none'>
            <div className="w-full flex justify-between">
              <h3 className='font-bold'>Profile Details</h3>

              <ModalBarberDetail data={userDetail?.description} control={control} errors={errors} onSubmit={onSubmit} setValue={setValue} />
            </div>

            <div className="w-full flex justify-between my-4 border-b-1">
              <ProfileItem icon={<MdOutlinePerson size={24} className='text-slate-400' />} name="Barbershop Name" value={userDetail?.name} />
              <ProfileItem icon={<MdCall size={24} className='text-slate-400' />} name="Contact" value={userDetail?.contact_number} />
            </div>
            <div className="w-full">
              <h3 className='font-bold'>Description</h3>

              <div dangerouslySetInnerHTML={{ __html: userDetail?.description }} />
             
            </div>
          </Card>


          {/* socmed */}
          <Card className='w-full p-8 mt-4 border-1' shadow='none'>
            <div className="w-full flex justify-between">
              <h3 className='font-bold'>Social Media</h3>
              <Button className='w-24 p-4' size='sm' variant='bordered' color='default'>
                Edit
              </Button>

              <ModalBarberSocmed control={control} errors={errors} onSubmit={onSubmit} setValue={setValue} />

            </div>

              <div className="w-full flex flex-col justify-between mt-12 gap-4">
                <ProfileItem icon={<FaInstagram size={24} className='text-orange-600' />} name="Instagram" value={userDetail?.social_media?.[1]?.platform_url || " - "} />
                <ProfileItem icon={<IoLogoTiktok size={24} className='text-slate-800' />} name="Tiktok" value={userDetail?.social_media?.[2]?.platform_url || " - "} />
                <ProfileItem icon={<MdFacebook size={24} className='text-blue-600' />} name="Facebook" value={userDetail?.social_media?.[0]?.platform_url || " - "} />
              </div>

          </Card>


        </div>
        <Card className='w-full p-8 pb-0 border-1' shadow='none'>
          <div className="w-full flex justify-between mb-8">
            <h3 className='font-bold'>Barber Location</h3>

            <ModalBarberLocation control={control} errors={errors} onSubmit={onSubmit} setValue={setValue} address={userDetail?.street_address} setAddress={setAddress}  />
          </div>

          <GoogleMapsEmbed latitude={userDetail?.latitude} longitude={userDetail?.longitude} width='100%' height='300' />

          <div className="w-full mt-8">
            <ProfileItem icon={<FaRegAddressCard size={24} className='text-slate-600' />} name="Street Address" value={userDetail?.street_address} />

            <div className="w-full flex justify-between my-4">
              <ProfileItem icon={<PiCityDuotone size={24} className='text-slate-600' />} name="City" value={userDetail?.city} />
              <ProfileItem icon={<FaMountainCity size={24} className='text-slate-600' />} name="Province" value={userDetail?.state_province_region} />
            </div>

            <div className="w-full flex justify-between">
              <ProfileItem icon={<GiIsland size={24} className='text-slate-600' />} name="Country" value={userDetail?.country} />
              <ProfileItem icon={<PiFileZip size={24} className='text-slate-600' />} name="ZIP Code" value={userDetail?.postal_zip_code} />
            </div>

          </div>



        </Card>

      </div>
    </div>
  )
}

export default StaffProfile