import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { checkBarbershopStatus, getImageUrl } from "../../utils/utils";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import { RiMapPinLine } from "react-icons/ri";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function RecommendationCard({ limit = 0 }) {
  const [datas, setDatas] = useState([]);
  const { response, error, loading, request } = useAxios();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); 
  const itemsPerPage = 8; 
  const [pageCount, setPageCount] = useState(0); 

  const fetchDatas = async () => {
    try {
      const result = await request(`/barbers`);

      if (limit > 0) {
        setDatas(result.data.slice(0, limit));
      } else {
        setDatas(result.data);
        setPageCount(Math.ceil(result.data.length / itemsPerPage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  // Fungsi untuk menangani perubahan halaman
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setCurrentPage(event.selected);
  };

  // Ambil item yang akan ditampilkan sesuai dengan halaman saat ini
  const currentItems = datas.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row justify-between pr-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Popular Barbershop
          </h2>

          {limit > 0 && (
            <button
              onClick={() => navigate("/explore")}
              className="border-2 border-zinc-900 px-4 hover:bg-zinc-900 hover:text-white rounded"
            >
              See all
            </button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {currentItems.map((data) => (
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

        {
          limit <= 0 && 
          (
            <ReactPaginate
            previousLabel={ <FaArrowLeft className="text-2xl" /> }
            nextLabel={ <FaArrowRight className="text-2xl" /> }
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center items-center py-4 gap-10 mt-8 border-y-1 mb-4"}
            activeClassName={"active bg-slate-800 text-slate-50"}
            pageClassName={"page-item w-14 text-center py-3 text-slate-900 rounded-lg bg-slate-50 border-1 text-slate-100 hover:opacity-80 cursor-pointer"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item px-4 py-3 hover:opacity-80 cursor-pointer rounded-lg bg-slate-800 border-1 text-slate-100"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item px-4 py-3 rounded-lg bg-slate-800 text-slate-100 hover:opacity-80 cursor-pointer"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />
            
          )
        }


      </div>
    </div>
  );
}
