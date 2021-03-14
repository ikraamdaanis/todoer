import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
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
  ReviewsSection,
  ReviewItem,
  ReviewsContainer,
  HomeContainer,
} from './HomeStyles'
import heroImage from '../../assets/images/hero-image.webp'
import heroFlowers from '../../assets/images/hero-flowers.webp'
import appScreenshot from '../../assets/images/hero-screenshot.png'
import { useSelector } from 'react-redux'
import { BrowseIcon, SeeTodo } from '../../assets'

export const Home = ({ history, active, setActive }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    userInfo && history.push('/app/today')
  }, [history, userInfo])

  !userInfo && setTimeout(() => setActive(true), 500)

  return (
    <HomeContainer className={active && 'visible'}>
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
      <FreeUp>
        <FreeUpHeading>Free up your mental space</FreeUpHeading>
        <FreeUpDescription>
          Regain clarity and calmness by getting all those tasks out of your head and onto your
          to-do list (no matter where you are or what device you use).
        </FreeUpDescription>
        <FreeUpLinks>
          <FeaturesLink to='#'>
            <BrowseIcon />
            Browse Todoer&#39;s Features
          </FeaturesLink>
          <FeaturesLink to='#'>
            <SeeTodo />
            See Todoist in action
          </FeaturesLink>
        </FreeUpLinks>
      </FreeUp>
      <ReviewsSection>
        <ReviewsContainer>
          <ReviewItem>
            <p className='reviewer'>Google Play</p>
            <div className='rating'>★★★★★</div>
            <h4 className='review-body'>Editor&#39;s Choice, 4.7 stars, 187K+ reviews</h4>
          </ReviewItem>
          <ReviewItem>
            <p className='reviewer'>Apple Store</p>
            <div className='rating'>★★★★★</div>
            <h4 className='review-body'>Featured App, 4.8 stars, 30K+ reviews</h4>
          </ReviewItem>
          <ReviewItem>
            <p className='reviewer'>The Verge</p>
            <div className='rating'>9/10</div>
            <h4 className='review-body'>&quot;The best to-do list app right now&quot;</h4>
          </ReviewItem>
        </ReviewsContainer>
      </ReviewsSection>
    </HomeContainer>
  )
}

Home.propTypes = { history: PropTypes.object, active: PropTypes.bool, setActive: PropTypes.func }
