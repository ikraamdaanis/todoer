import React from 'react'
import {
  Hero,
  HeroTitleContainer,
  HeroTitle,
  HeroButton,
  HeroBackground,
  FreeUp,
  FreeUpHeading,
  FreeUpDescription,
  FeaturesLink,
  FreeUpLinks,
} from './HomeStyles'
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
        <FreeUp>
          <FreeUpHeading>Free up your mental space</FreeUpHeading>
          <FreeUpDescription>
            Regain clarity and calmness by getting all those tasks out of your head and onto your
            to-do list (no matter where you are or what device you use).
          </FreeUpDescription>
          <FreeUpLinks>
            <FeaturesLink to='#'>Browse Todoer&#39;s Features</FeaturesLink>
            <FeaturesLink to='#'>See Todoist in action</FeaturesLink>
          </FreeUpLinks>
        </FreeUp>
      </Hero>
    </div>
  )
}
