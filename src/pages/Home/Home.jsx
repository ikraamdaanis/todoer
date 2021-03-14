import React from 'react'
import { Hero, HeroTitleContainer, HeroTitle, HeroButton, HeroBackground } from './HomeStyles'
import heroImage from '../../assets/images/hero-image.webp'
import heroFlowers from '../../assets/images/hero-flowers.webp'
import appScreenshot from '../../assets/images/hero-screenshot.png'

export const Home = () => {
  return (
    <div>
      <Hero>
        <HeroTitleContainer>
          <HeroTitle>
            Organize it all
            <br /> with Todoer
          </HeroTitle>
          <HeroButton to='/signup'>Get Started</HeroButton>
        </HeroTitleContainer>
        <HeroBackground>
          <img src={heroImage} alt='Hero Background' />
        </HeroBackground>
        <HeroBackground className='screenshot'>
          <img src={appScreenshot} alt='Screenshot of app' />
        </HeroBackground>
        <HeroBackground className='flowers'>
          <img src={heroFlowers} alt='Hero Background' />
        </HeroBackground>
      </Hero>
    </div>
  )
}
