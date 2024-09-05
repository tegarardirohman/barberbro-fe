import { StarIcon } from "@heroicons/react/20/solid/index.js";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { checkBarbershopStatus, formatDistance, getImageUrl, isBarbershopOpenToday } from "../../utils/utils";
import { Rating } from "react-simple-star-rating";
import { Navigate, useNavigate } from "react-router-dom";
import { RiMapPinLine } from "react-icons/ri";
import { Chip } from "@nextui-org/react";

export default function NearbyBarber() {
  const [datas, setDatas] = useState([]);
  const { response, error, loading, request } = useAxios();
  const navigate = useNavigate();

  const fetchDatas = async () => {
    const location = {
      latitude: -7.9348058,
      longitude: 112.6027173,
    };

    try {
      const result = await request(
        `/barbers/nearby?latitude=${location.latitude}&longitude=${location.longitude}`
      );

      console.log(result);

      setDatas(result.data);
      console.log(datas);
    } catch (error) {
      console.log(error);
    }
  };

  const getShortDayName = (longDayName) => {
    const dayMap = {
      SUNDAY: "SUN",
      MONDAY: "MON",
      TUESDAY: "TUE",
      WEDNESDAY: "WED",
      THURSDAY: "THU",
      FRIDAY: "FRI",
      SATURDAY: "SAT",
    };

    return dayMap[longDayName] || longDayName;
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row justify-between pr-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nearby Barbershop
          </h2>
          <button className="border-2 border-zinc-900 px-4 hover:bg-zinc-900 hover:text-white rounded">
            See all
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {datas.map((data) => (
            <div
              key={data.id}
              className="group relative cursor-pointer"
              onClick={() => navigate(`/barbershop/${data.id}`)}
            >
              <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 relative">
                <img
                  alt={data.barbershop_profile_picture_id.name}
                  src={getImageUrl(data.barbershop_profile_picture_id.path)}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>

              <div className="w-full flex justify-between mt-2 items-center">

                <div className="text-sm font-light flex flex-row gap-1 backdrop-blur py-1 rounded-full">
                        <RiMapPinLine /> { data.city }
                </div>

                <h4 className="text-sm font-bold text-zinc-900">
                  {formatDistance(data.distance_km)}
                </h4>

              </div>

              <h3 className="text-lg font-bold text-zinc-900 py-1 w-full border-b-1">
                {data.name}
              </h3>

              <h6 className="text-xs font-semibold text-zinc-600 mt-1">
                    {checkBarbershopStatus(data.operational_hours)}
                </h6>

            <div className="flex w-full justify-between items-end">
                <div className="flex items-end justify-start gap-2">
                  <Rating
                    initialValue={data.average_rating}
                    size={20}
                    readonly
                  />
                  <div className="text-xs font-light">
                    {" "}
                    ( {data.review_count} Reviews){" "}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
