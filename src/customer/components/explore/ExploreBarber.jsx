import { checkBarbershopStatus, getImageUrl } from "../../../utils/utils";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { RiMapPinLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function ExploreBarber({ datas }) {
  const navigate = useNavigate();
  const [sort, setSort] = useState("name");

  const handleSort = (e) => {
    setSort(e.target.value)
  }

  useEffect(() => {
    datas.sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "rating") {
        return b.rating - a.rating;
      } else if (sort === "distance") {
        return a.distance - b.distance;
      }
    });
  }, [sort]);

  return (
    <div className="bg-white mt-8">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row justify-between pr-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 flex-1">
            Search Barbershop
          </h2>

          <Select size='sm' label="Sort by" onChange={handleSort} selectedKeys={[sort]} className="w-32">
            <SelectItem key="Name" value="name">Name</SelectItem>
            <SelectItem key="Rating" value="rating">Rating</SelectItem>
            <SelectItem key="Distance" value="distance">Distance</SelectItem>
            </Select>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {datas.map((data) => (
            <div
              key={data.id}
              className="group relative cursor-pointer"
              onClick={() => navigate(`/barbershop/${data.id}`)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={data.barbershop_profile_picture_id.name}
                  src={getImageUrl(data.barbershop_profile_picture_id.path)}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>

              <div className="w-full flex justify-between mt-2 items-center">
                <div className="text-sm font-light flex flex-row gap-1 backdrop-blur py-1 rounded-full">
                  <RiMapPinLine /> {data.city}
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-900 py-1 w-full border-b-1">
                {data.name}
              </h3>

              <h6 className="text-xs font-semibold text-zinc-600 mt-1">
                {checkBarbershopStatus(data.operational_hours)}
              </h6>

              <div className="w-full flex items-end justify-start gap-2">
                <Rating initialValue={data.average_rating} size={20} readonly />
                <div className="text-xs font-light">
                  {" "}
                  ( {data.review_count} Reviews){" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
