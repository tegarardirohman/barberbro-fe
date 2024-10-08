import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import ModalBooking from "../booking/ModalBooking.jsx";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import Carousel from "./Carousel.jsx";
import useAxios from "../../../hooks/useAxios.jsx";
import GoogleMapsEmbed from "../googleMap/GoogleMapsEmbed.jsx";
import GoogleMapsLink from "../googleMap/GoogleMapsLink.jsx";
import { Card } from "@nextui-org/react";
import ProfileItem from "../../../barber/components/profile/ProfileItem.jsx";
import { PiAt, PiCityDuotone, PiPhoneDuotone } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import { MdFacebook } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BarbershopOverview({ data }) {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(2);
  const [images, setImages] = useState([]);

  const { response, error, loading, request } = useAxios();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (data.id) {
      const fetchImages = async () => {
        try {
          const result = await request(`/barbers/${data.id}/gallery-images`);
          setImages(result.data);
          console.log(result.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchImages();
    }
  }, [data]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <Link
                  to={"/"}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  Home
                </Link>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <Link
                  to={"/explore"}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  Barbers
                </Link>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <Link
                to={""}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {data.name}
              </Link>
            </li>
          </ol>
        </nav>

        <Carousel datas={images} />

        {/* Image gallery
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            alt={product.images[0].alt}
                            src={product.images[0].src}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                alt={product.images[1].alt}
                                src={product.images[1].src}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                alt={product.images[2].alt}
                                src={product.images[2].src}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img
                            alt={product.images[3].alt}
                            src={product.images[3].src}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div> */}

        {/* barber info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {data.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            {/* <h2 className="sr-only">Product information</h2> */}

            <div className="flex w-full">
            <p className="text-md tracking-tight text-gray-900 mb-4">
              {data.street_address}
            </p>


            </div>

            <GoogleMapsEmbed latitude={data.latitude} longitude={data.longitude} />

            <div className="mt-10">
              <div className="w-full">

                {
                  data?.operational_hours?.map((hour, index) => (
                    <div className="w-full flex justify-between items-center gap-2 mb-2" key={index}>

                      <h3 className="text-sm font-light">
                        {hour.day}
                      </h3>
                      <p className="text-sm font-medium text-gray-900">
                        {hour.opening_time} - {hour.closing_time}
                      </p>

                    </div>
                  ))
                }



              </div>

              
              <div>
                <ModalBooking data={data} />
              </div>
            </div>
          </div>

          <div className="pt-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">

            {/* Services */}
            <div className="w-full mt-2 pb-6 mb-4 border-b-2">
              <h2 className="text-md font-medium text-gray-900">Services</h2>

              <div className="mt-4 flex w-full gap-2">
                {data?.services?.map((service) => (
                  <Card key={service.service_id} className="text-sm p-4 font-bold border-1" radius="sm" shadow="none">
                    {service.service_name}
                  </Card> 
                ))}
              </div>
            </div>


            {/* Description and details */}
            <div>
              <div className="space-y-6">
              <div className="text-base text-gray-900" dangerouslySetInnerHTML={{ __html: data?.description }} />
              </div>
            </div>



            {/* Detail */}
            <div className="mt-10 border-t-2 py-4">
              <h2 className="text-md font-medium text-gray-900 mb-2">
                More
              </h2>

              <div className="w-full flex justify-between">

                <ProfileItem icon={<PiPhoneDuotone size={24} className='text-slate-600' />} name="Phone" value={data?.contact_number} />
                <ProfileItem icon={<PiAt size={24} className='text-slate-600' />} name="Email" value={data?.email} />

              </div>

              <ProfileItem icon={<PiCityDuotone size={24} className='text-slate-600' />} name="City" value={data?.city} />
            </div>


            {/* Socmed */}
            <div className="mt-4 border-t-2 py-4">
              <h2 className="text-md font-medium text-gray-900">
                Social Media
              </h2>

              <div className="w-full flex justify-between">

              <div className="w-full flex flex-col justify-between mt-4 gap-4">
                <ProfileItem icon={<FaInstagram size={24} className='text-orange-600' />} name="Instagram" value={<a href={data?.social_media?.[1]?.platform_url} target="_blank">{data?.social_media?.[1]?.platform_url}</a> || " - "} />
                <ProfileItem icon={<IoLogoTiktok size={24} className='text-slate-900' />} name="Tiktok" value={<a href={data?.social_media?.[2]?.platform_url} target="_blank">{data?.social_media?.[2]?.platform_url}</a> || " - "} />
                <ProfileItem icon={<MdFacebook size={24} className='text-blue-600' />} name="Facebook" value={<a href={data?.social_media?.[0]?.platform_url} target="_blank">{data?.social_media?.[0]?.platform_url}</a> || " - "} />
              </div>

              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}
