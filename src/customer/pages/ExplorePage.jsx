import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAxios from "../../hooks/useAxios";
import ExploreBarber from "../components/explore/ExploreBarber";
import { FooterPage } from "./FooterPage";
import HeroExplore from "../components/explore/HeroExplore";
import NearbyBarber from "../components/NearbyBarber";
import RecommendationCard from "../components/RecommendationCard";

const ExplorePage = () => {
  useDocumentTitle("Explore Barberbro In World");

  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]); 
  const [search, setSearch] = useState("");
  const [day, setDay] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { request } = useAxios();

  const fetchData = async () => {
    try {
      const res = await request("/barbers");
      setDatas(res.data);
      setFilteredDatas(res.data); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

    if (!search && !day) {
      setFilteredDatas(datas);
      setIsSearching(false);
      return;
    }

    const filtered = datas.filter((data) => {
      return (
        data.name.toLowerCase().includes(search.toLowerCase()) || 
        data.operational_hours.includes(day)
      );
    });

    setFilteredDatas(filtered);
    setIsSearching(true);
  }, [search, day, datas]);


  const resetSearch = () => {
    setSearch("");
    setDay("");
    setFilteredDatas(datas);
    setIsSearching(false);
  };

  return (
    <>
      <HeroExplore setSearch={setSearch} day={day} setDay={setDay} onReset={resetSearch} />

      {isSearching && filteredDatas.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">No Barber Found</h1>
        </div>
      ) : isSearching && filteredDatas.length > 0 ? (
        <ExploreBarber datas={filteredDatas} />
      ) : (
        <>
          <NearbyBarber />
          <RecommendationCard />
        </>
      )}

      <FooterPage />
    </>
  );
};

export default ExplorePage;
