import React from 'react'
import HeroSlider from '../components/HeroSlider'
import FeaturedProducts from '../components/FeaturedProducts'
import TopProducts from '../components/TopProducts'
import Advantages from '../components/Advantages'
function Home() {
  return (
    <>
    <HeroSlider/>
    <FeaturedProducts />
    <TopProducts />
    <Advantages/>
    </>
  )
}

export default Home