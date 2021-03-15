import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import reviewsImage from '../../assets/images/reviews.webp'

export const HomeContainer = styled.div`
  padding-top: 64px;
  opacity: 0;
  transition: 5s ease-in-out 1s;

  @media (max-width: 770px) {
    padding-top: 48px;
  }

  &.visible {
    transition: 0.5s ease-in-out 0.1s;
    opacity: 1;
  }
`

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  height: calc(100% - 40rem);
`

export const HeroTitleContainer = styled.div`
  padding: 7.5rem 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 1120px) {
    padding: 6.5rem 1rem 0;
  }

  @media (max-width: 1120px) {
    padding: 5.5rem 1rem 0;
  }
`

export const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.05;

  @media (max-width: 1120px) {
    font-size: 4.2rem;
  }

  @media (max-width: 770px) {
    font-size: 3.75rem;
  }

  @media (max-width: 480px) {
    font-size: 2.75rem;
    font-weight: 700;
  }
`

export const HomeButton = styled(Link)`
  margin-top: 2rem;
  color: #fff;
  border-color: #e44232;
  background-color: #e44232;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 0.625rem;
  padding: 12px 28px;
  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.05);
  }
`

export const HeroBackground = styled.div`
  padding: 0 1rem;
  display: grid;
  place-content: center;
  position: relative;
  z-index: -3;
  max-width: 1256px;
  margin: -10rem auto;
  width: 100%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  img {
    width: 100%;
  }

  &.flowers {
    width: 100vw;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: -2;

    img {
      width: 100%;
    }
  }

  &.screenshot {
    z-index: -1;
    margin: -6rem auto -17.5rem;

    @media (max-width: 770px) {
      margin: -1rem auto -10rem;
    }

    @media (max-width: 480px) {
      margin: -1rem auto -2rem;
    }
  }

  @media (max-width: 1120px) {
    margin: -8rem auto;
  }

  @media (max-width: 770px) {
    margin: -4rem auto;
  }

  @media (max-width: 480px) {
    margin: -2rem auto;
  }
`

export const FreeUp = styled.section`
  padding: 4rem 1rem 6rem;
  text-align: center;
  background: ${props => props.theme.background};
  width: 100%;
  bottom: calc(0.3 * 100px);
  left: 0;

  @media (max-width: 660px) {
    padding: 2.5rem 1rem 1rem;
    text-align: left;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem 2rem;
    transform: translateY(-100px);
  }
`

export const FreeUpHeading = styled.h2`
  font-size: 3.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 600;

  &::-moz-selection {
    background: ${props => props.theme.highligh};
  }
  &::selection {
    background: ${props => props.theme.highligh};
  }

  @media (max-width: 770px) {
    font-size: 3.5rem;
  }

  @media (max-width: 660px) {
    font-size: 2.5rem;
  }

  @media (max-width: 500px) {
    font-size: 2rem;
  }
`

export const FreeUpDescription = styled.p`
  max-width: 47rem;
  display: inline-block;
  margin: 1rem 0;
  line-height: 1.5;
  font-size: 18px;
  font-weight: 300;
  font-size: 1.3125rem;
  letter-spacing: -0.01em;
  color: #1f1f1f;

  &::-moz-selection {
    background: ${props => props.theme.highligh};
  }
  &::selection {
    background: ${props => props.theme.highligh};
  }

  @media (max-width: 600px) {
    font-size: 17px;
  }
`

export const FreeUpLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 540px) {
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
  }
`

export const FeaturesLink = styled(Link)`
  display: flex;
  cursor: pointer;
  margin: 0 1.5rem;
  align-items: center;
  min-height: 48px;
  color: #316fea;
  font-weight: 300;

  @media (max-width: 540px) {
    margin: 0 1.5rem 0 0;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }

  svg {
    margin-right: 0.25rem;
  }
`
export const ReviewsSection = styled.section`
  display: flex;
  background: url(${reviewsImage});
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: 50%;
  position: relative;
  z-index: 1;
  margin-top: -3rem;

  @media (max-width: 700px) {
    background: #fed35e;
    margin-top: 5rem;
  }

  @media (max-width: 480px) {
    margin-top: -3rem;
  }
`

export const ReviewsContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 3rem auto 0;
  padding: 10rem 5rem;
  justify-content: space-between;
  display: flex;

  @media (max-width: 700px) {
    padding: 2rem 2rem;
    margin: 0;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`

export const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  padding: 0.8rem 0.5rem;

  @media (max-width: 970px) {
    width: 28%;
  }

  @media (max-width: 700px) {
    width: 50%;
    max-width: 200px;
  }

  .reviewer {
    margin-bottom: 1rem;
    font-size: 1rem;
    letter-spacing: 0;
  }

  .rating {
    margin-bottom: 1rem;
    font-weight: 700;
  }

  .review-body {
    margin-bottom: 1rem;
    line-height: 1.35;
    font-weight: 600;
    font-size: 1.5rem;
    letter-spacing: -0.01em;

    @media (max-width: 1050px) {
      font-size: 1.4rem;
    }
  }
`

export const AchieveSection = styled.section`
  padding: 6rem 1rem;
  background: #fff9f3;
  margin-top: 10rem;

  @media (max-width: 700px) {
    margin-top: 0;
  }
`

export const AchieveContainer = styled.div`
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  img {
    margin-top: -10rem;
    max-width: 404px;
    max-height: 468px;
    position: relative;

    @media (max-width: 959px) {
      width: 40%;
      margin-top: 0;
    }

    @media (max-width: 770px) {
      display: none;
    }
  }
`

export const AchieveHeadingContainer = styled.div`
  width: 52%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  @media (max-width: 770px) {
    width: 100%;
    text-align: center;
    align-items: center;
  }
`

export const AchieveHeading = styled.h2`
  font-size: 3.25rem;
  font-weight: 600;

  @media (max-width: 900px) {
    font-size: 2.5rem;
    max-width: 450px;
  }
`

export const Footer = styled.footer`
  background: #fff9f3;
`

export const FooterLine = styled.div`
  width: 100%;
  margin: 0 auto 4rem;
  max-width: 1120px;
  background: #fff9f3;
  border-top: 1px solid transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0 3rem;

  @media (max-width: 960px) {
    flex-direction: column;
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    max-width: 500px;
  }

  @media (max-width: 480px) {
    margin-left: 3rem;
    padding: 0rem 0 3rem;
  }
`

export const FooterContent = styled.div`
  display: flex;
  padding: 2rem 1rem 3rem;

  @media (max-width: 480px) {
    max-width: 425px;
  }
`

export const FooterMain = styled.section`
  max-width: 300px;

  @media (max-width: 960px) {
    max-width: unset;
  }
`

export const FooterLogo = styled(Link)`
  display: none;
  align-items: center;
  height: 32px;
  width: 32px;

  &.large-viewport {
    display: flex;

    @media (max-width: 480px) {
      display: none;
    }
  }

  &.small-viewport {
    @media (max-width: 480px) {
      display: flex;
    }
  }

  img {
    width: 32px;
  }
`

export const FooterDescription = styled.p`
  margin: 1rem 0 2rem;
  font-size: 1.02rem;
  line-height: 1.5;
  font-weight: 300;
  color: #1f1f1f;

  @media (max-width: 480px) {
    margin: 0 0 2rem;
    font-size: 0.875rem;
  }
`

export const FooterLinks = styled.section`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  div:not(:last-child) {
    margin-right: 4rem;
  }

  @media (max-width: 960px) {
    margin-top: 3rem;
    justify-content: space-between;
    max-width: 600px;

    div:not(:last-child) {
      margin-right: 1rem;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;

    div:not(:last-child) {
      margin: 1rem 0 0;
    }
  }

  div {
    @media (max-width: 480px) {
      flex-direction: column;
    }

    p {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
      font-weight: 300;
      line-height: 1.5;
      letter-spacing: 0;
      text-transform: uppercase;
      color: #575757;
    }

    ul {
      cursor: pointer;

      li {
        margin-bottom: 1rem;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: 0;
        font-weight: 300;
        color: #1f1f1f;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`

export const FooterFeatures = styled.div``

export const FooterResources = styled.div``

export const FooterCompany = styled.div``
