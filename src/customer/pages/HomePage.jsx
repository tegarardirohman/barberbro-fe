import React from 'react'
import Hero from '../components/Hero'
import SearchBar from '../components/SearchBar'
import RecommendationCard from '../components/RecommendationCard.jsx'
import LogoClouds from "../components/LogoClouds.jsx";
import {FooterPage} from "./FooterPage.jsx";
import Statistics from "../components/Statistics.jsx";
import GetLocation from '../components/GetLocation.jsx';
import NearbyBarber from '../components/NearbyBarber.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle.jsx';

const HomePage = () => {
    useDocumentTitle('Barberbro - Home')
    return (
        <>
            <Hero/>
            {/* <SearchBar /> */}
            <LogoClouds/>
            <Statistics/>
            <NearbyBarber />
            <RecommendationCard/>
            <FooterPage/>
        </>
    )
}

export default HomePage