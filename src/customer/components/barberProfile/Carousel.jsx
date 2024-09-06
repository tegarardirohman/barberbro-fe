import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';
import useAxios from '../../../hooks/useAxios';

const Carousel = ({ datas }) => {

    if (datas.length == 0) {
        return (
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            alt={"image 1"}
                            src={"https://images.unsplash.com/photo-1522123436910-416191f97bfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                alt={"image 2"}
                                src={"https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img
                                alt={"image 3"}
                                src={"https://images.unsplash.com/photo-1516646720587-727f6728837d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <img
                            alt={"image 4"}
                            src={"https://images.unsplash.com/photo-1529434173292-b6709e2fe899?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div> 
        )
    }

  return (
    <div className="mx-auto mt-6 w-full max-w-7xl">
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={16}
      slidesPerView={2}
      navigation={ true}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
    >
        {datas?.images?.map((data, index) => (

          <SwiperSlide key={index} className="">
            <img
              className="h-[28rem] object-cover aspect-video"
              src={data.src}
              alt={data.alt}
            />
          </SwiperSlide>

        ))}
          
         
      </Swiper>
    </div>
  );
};

export default Carousel;
