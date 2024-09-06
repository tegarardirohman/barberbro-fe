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
            {/* <GoogleMapsLink latitude={data.latitude} longitude={data.longitude} /> */}

            {/* Reviews */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center align-center">
                  <Rating
                    initialValue={data.average_rating}
                    size={20}
                    readonly
                  />
                </div>
                <p className="sr-only">{data.review_count} out of 5 stars</p>
                <a
                  href={"#"}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {data.review_count} reviews
                </a>
              </div>
            </div> */}

            {/* <div className="flex flex-row items-center my-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"  
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="px-2 text-zinc-900">3.2 Km</h3>
            </div> */}

            <div className="mt-10">
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    List of Services
                  </h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    See all services
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {data?.services?.map((service) => (
                      <Radio
                        key={service.service_id}
                        value={service.service_name}
                        className={classNames(
                          true
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                        )}
                      >
                        <span className="text-center font-bold">
                          {service.service_name}
                        </span>
                        {true ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
              <div>
                <ModalBooking data={data} />
              </div>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{data.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">
                Operational Hours
              </h2>

              <div className="mt-4 space-y-6">
                {data?.operational_hours?.map((day, index) => (
                  <p key={index} className="text-sm text-gray-600 font-bold">
                    {" "}
                    {day.day} | {day.opening_time} - {day.closing_time}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
