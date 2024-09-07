import React, { useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getImageUrl } from "../../../utils/utils";
import { FaFaceAngry, FaRegFaceAngry } from "react-icons/fa6";

const Carousel = ({ datas }) => {
  const swiperRef = useRef(null);

  // Jika tidak ada data, tampilkan gambar default
  if (datas.length === 0) {
    return (
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img
            alt="Default Image 1"
            src="https://images.unsplash.com/photo-1522123436910-416191f97bfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt="Default Image 2"
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt="Default Image 3"
              src="https://images.unsplash.com/photo-1516646720587-727f6728837d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            alt="Default Image 4"
            src="https://images.unsplash.com/photo-1529434173292-b6709e2fe899?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    );
  }

  // Kelompokkan data gambar dalam kelompok 4
  const groupedImages = [];
  for (let i = 0; i < datas.length; i += 4) {
    groupedImages.push(datas.slice(i, i + 4));
  }

  return (
    <div className="mx-auto w-full px-40 relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 2000 }}
        loop
      >
        {groupedImages.map((group, groupIndex) => {
          if (group.length < 4) {
            return (
              <SwiperSlide key={groupIndex} className="w-full h-[40rem]">
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 h-full">
                  {group.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block"
                    >
                      <img
                        alt={image.name}
                        src={getImageUrl(image.path)}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            );
          } else {
            return (
              <SwiperSlide key={groupIndex} className="w-full h-[40rem]">
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 h-full">
                  <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                    <img
                      alt={group[0].name}
                      src={getImageUrl(group[0].path)}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        alt={group[1].name}
                        src={getImageUrl(group[1].path)}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                      <img
                        alt={group[2].name}
                        src={getImageUrl(group[2].path)}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                    <img
                      alt={group[3].name}
                      src={getImageUrl(group[3].path)}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>

      {/* Kontrol Kustom */}
      <div
        className="swiper-button-prev absolute top-1/2 left-4 z-10 cursor-pointer text-white"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        testttt
      </div>
      <div
        className="swiper-button-next absolute top-1/2 right-4 z-10 cursor-pointer text-white"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
