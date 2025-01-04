import Hero from '../components/Hero'
import RecommendationCard from '../components/RecommendationCard.jsx'
import LogoClouds from "../components/LogoClouds.jsx";
import {FooterPage} from "./FooterPage.jsx";
import Statistics from "../components/Statistics.jsx";
import NearbyBarber from '../components/NearbyBarber.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle.jsx';

const HomePage = () => {
    useDocumentTitle('Barberbro - Home')
    return (
        <>
            <Hero/>
            <LogoClouds/>
            <Statistics/>
            <NearbyBarber limit={8} />
            <RecommendationCard limit={8} />
            <FooterPage/>
        </>
    )
}

export default HomePage