import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Hero,
  HeroTitleContainer,
  HeroTitle,
  HomeButton,
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
  AchieveSection,
  AchieveContainer,
  AchieveHeadingContainer,
  AchieveHeading,
  Footer,
  FooterLine,
  FooterContainer,
  FooterMain,
  FooterLogo,
  FooterDescription,
  FooterContent,
  FooterLinks,
  FooterFeatures,
  FooterResources,
  FooterCompany,
  FooterSocials,
} from './HomeStyles'
import {
  BrowseIcon,
  heroImage,
  heroFlowers,
  appScreenshot,
  SeeTodoIcon,
  flower,
  todoerLogoSmBlack,
  FacebookIcon,
  TwitterIcon,
  YouTubeIcon,
  InstagramIcon,
} from '../../assets'
import { useSelector } from 'react-redux'

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
          <HomeButton to='/signup'>Get Started</HomeButton>
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
            <SeeTodoIcon />
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
      <AchieveSection>
        <AchieveContainer>
          <img src={flower} alt='peaceful looking flower pot with red flower' />
          <AchieveHeadingContainer>
            <AchieveHeading>Achieve peace of mind with Todoer</AchieveHeading>
            <HomeButton to='/login'>Get Started</HomeButton>
          </AchieveHeadingContainer>
        </AchieveContainer>
      </AchieveSection>
      <Footer>
        <FooterLine />
        <FooterContent>
          <FooterLogo to='/signup' className='small-viewport'>
            <img src={todoerLogoSmBlack} alt='Todoer Logo Black' />
          </FooterLogo>
          <FooterContainer>
            <FooterMain>
              <FooterLogo to='/signup' className='large-viewport'>
                <img src={todoerLogoSmBlack} alt='Todoer Logo Black' />
              </FooterLogo>
              <FooterDescription>
                Join millions of people who organize work and life with Todoist.
              </FooterDescription>
              <FooterSocials>
                <FacebookIcon />
                <TwitterIcon />
                <YouTubeIcon />
                <InstagramIcon />
              </FooterSocials>
            </FooterMain>
            <FooterLinks>
              <FooterFeatures>
                <p>Features</p>
                <ul>
                  <li>How it works</li>
                  <li>Premium</li>
                  <li>For Teams</li>
                  <li>Pricing</li>
                  <li>Templates</li>
                </ul>
              </FooterFeatures>
              <FooterResources>
                <p>Resources</p>
                <ul>
                  <li>Download Apps</li>
                  <li>Help Center</li>
                  <li>Productivity Methods</li>
                  <li>Refer a friend</li>
                  <li>Integrations</li>
                  <li>Channel Partners</li>
                  <li>Developer API</li>
                </ul>
              </FooterResources>
              <FooterCompany>
                <p>Company</p>
                <ul>
                  <li>About Us</li>
                  <li>We are hiring!</li>
                  <li>Blog</li>
                  <li>Press</li>
                  <li>Twist</li>
                </ul>
              </FooterCompany>
            </FooterLinks>
          </FooterContainer>
        </FooterContent>
      </Footer>
    </HomeContainer>
  )
}

Home.propTypes = { history: PropTypes.object, active: PropTypes.bool, setActive: PropTypes.func }
