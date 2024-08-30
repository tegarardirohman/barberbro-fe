import React from 'react'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import RecommendationCard from '../components/RecommendationCard.jsx'
import LogoClouds from "../components/LogoClouds.jsx";
import {FooterPage} from "./FooterPage.jsx";
import Statistics from "../components/Statistics.jsx";

const HomePage = () => {
    return (
        <>
            <Hero/>
            {/* <SearchBar /> */}
            <LogoClouds/>
            <Statistics/>
            <RecommendationCard/>
            <RecommendationCard/>
            <FooterPage/>
        </>
    )
}

export default HomePage