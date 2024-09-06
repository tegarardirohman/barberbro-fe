import React from 'react'
import NavbarBarber from '../components/NavbarBarber'
import Hero from '../components/Hero'
import HeroExplore from '../components/explore/HeroExplore'
import NearbyBarberExplore from '../components/explore/NearbyBarberExplore'
import NearbyBarber from '../components/NearbyBarber'
import RecommendationCard from '../components/RecommendationCard'
import { FooterPage } from './FooterPage'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const ExplorePage = () => {
  useDocumentTitle('Explore Barberbro In World')
  return (
    <>
      {/* <NavbarBarber /> */}
      <HeroExplore />
      <NearbyBarber />
      <RecommendationCard />

      <FooterPage />
      
    </>
  )
}

export default ExplorePage