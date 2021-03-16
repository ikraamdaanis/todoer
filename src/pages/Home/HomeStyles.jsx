import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { reviewsImage } from '../../assets'

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
  overflow: hidden;
  text-align: center;
  white-space: pre-line;

  @media (max-width: 480px) {
    overflow: initial;
  }
`

export const HeroTitleContainer = styled.div`
  padding: 7rem 1rem 0;
  margin-bottom: -10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 1120px) {
    margin-bottom: -5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: -2rem;
  }
`

export const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 600;
  text-align: center;
  white-space: pre;

  &::-moz-selection {
    background: ${props => props.theme.highlight};
  }

  &::selection {
    background: ${props => props.theme.highlight};
  }

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
  user-select: none;

  &:hover {
    filter: brightness(1.05);
  }
`

export const HeroBackground = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0 1rem;
  display: grid;
  place-content: center;
  position: relative;
  z-index: -3;
  max-width: 1256px;
  display: block;
  margin: 0 auto;
  width: 90%;

  @media (max-width: 480px) {
    width: 100%;
    max-width: none;
  }

  img {
    width: 100%;
  }

  &.flowers {
    left: 50%;
    bottom: -3%;
    width: 100vw;
    max-width: 1411px;
    position: absolute;
    transform: translateX(-50%);
    z-index: -5;
    display: block;
    margin: 0 auto;
  }

  &.screenshot {
    position: relative;
    display: flex;
    margin: -6rem auto -17.5rem;
    justify-content: center;

    @media (max-width: 1120px) {
      margin: -8% auto -20.5%;
      padding-left: 1rem;
    }

    @media (max-width: 480px) {
      margin: -11% auto 0;
    }

    img {
      width: 100vw;
      max-width: 1398px;
      display: block;
      margin: 0 auto;
    }
  }
`

export const FreeUp = styled.section`
  padding: 4rem 0 6rem;
  text-align: center;
  background: ${props => props.theme.background};
  width: 100%;
  bottom: calc(0.3 * 100px);
  left: 0;

  @media (max-width: 768px) {
    padding: 4rem 1rem 8vw;
  }

  @media (max-width: 480px) {
    text-align: left;
    padding: 0 1rem 8vw;
  }
`

export const FreeUpHeading = styled.h2`
  font-size: 3.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 600;

  &::-moz-selection {
    background: ${props => props.theme.highlight};
  }
  &::selection {
    background: ${props => props.theme.highlight};
  }

  @media (max-width: 1120px) {
    font-size: 3.25rem;
  }

  @media (max-width: 768px) {
    font-size: 2.75rem;
  }

  @media (max-width: 480px) {
    max-width: 80%;
    font-size: 2rem;
    line-height: 1.15;
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
    background: ${props => props.theme.highlight};
  }
  &::selection {
    background: ${props => props.theme.highlight};
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media (max-width: 480px) {
    font-size: 1.0625rem;
  }
`

export const FreeUpLinks = styled.div`
  display: flex;
  color: #316fea;
  align-items: center;
  padding-bottom: 0.3rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    line-height: 2rem;
  }

  @media (max-width: 480px) {
    align-items: start;
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

  &::-moz-selection {
    background: ${props => props.theme.highlight};
  }
  &::selection {
    background: ${props => props.theme.highlight};
  }

  @media (max-width: 540px) {
    margin: 0 1.5rem 0 0;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin: 0;
  }

  svg {
    margin-right: 0.25rem;
  }
`
export const ReviewsSection = styled.section`
  margin: -5rem 0 -3rem;
  padding: 9rem 0 5rem;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 1120px) {
    background-size: 1400px auto;
  }

  @media (max-width: 768px) {
    margin: 2rem 0 0;
    padding: 2rem 0 1rem;
    background: #ffd669;
  }
`

export const ReviewsBackground = styled.div`
  background-image: url(${reviewsImage});
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: 50%;
  margin: 0;
  padding: 0;
  border: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

export const ReviewsContainer = styled.div`
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1120px;
  position: relative;
  z-index: 1;
  white-space: pre-wrap;

  @media (max-width: 959px) {
    max-width: 768px;
  }

  @media (max-width: 768px) {
    text-align: center;
    flex-direction: column;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    max-width: 425px;
  }
`

export const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.5rem;

  .reviewer {
    margin-bottom: 1rem;
    font-size: 1rem;
    letter-spacing: 0;

    &::-moz-selection {
      background: ${props => props.theme.highlight};
    }
    &::selection {
      background: ${props => props.theme.highlight};
    }
  }

  .review {
    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
      flex-direction: column-reverse;
    }

    .rating {
      margin-bottom: 1rem;
      font-weight: 700;

      &::-moz-selection {
        background: ${props => props.theme.highlight};
      }
      &::selection {
        background: ${props => props.theme.highlight};
      }
    }

    .review-body {
      margin-bottom: 1rem;
      line-height: 1.35;
      font-weight: 600;
      font-size: 1.5rem;
      letter-spacing: -0.01em;

      &::-moz-selection {
        background: ${props => props.theme.highlight};
      }
      &::selection {
        background: ${props => props.theme.highlight};
      }

      @media (max-width: 1050px) {
        font-size: 1.4rem;
      }
    }
  }
`

export const AchieveSection = styled.section`
  padding: 6rem 1rem;
  background: #fff9f3;
  margin-top: 10rem;

  @media (max-width: 770px) {
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

  &::-moz-selection {
    background: ${props => props.theme.highlight};
  }

  &::selection {
    background: ${props => props.theme.highlight};
  }

  @media (max-width: 770px) {
    max-width: 450px;
    font-size: 2.375rem;
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
    max-width: 768px;
    padding: 0 1rem;
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

  &::-moz-selection {
    background: ${props => props.theme.highlight};
  }

  &::selection {
    background: ${props => props.theme.highlight};
  }

  @media (max-width: 480px) {
    margin: 0 0 2rem;
    font-size: 0.875rem;
  }
`

export const FooterSocials = styled.div`
  display: flex;
  align-items: center;

  svg:not(:first-child) {
    margin-left: 1rem;
  }

  svg {
    color: #8d8b86;
    transition: 0.2s ease-in-out;
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;

    &:hover {
      color: #575654;
    }
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
      font-size: 12px;
      margin-bottom: 1.5rem;
      font-weight: 300;
      line-height: 1.5;
      letter-spacing: 0;
      text-transform: uppercase;
      color: #575757;

      &::-moz-selection {
        background: ${props => props.theme.highlight};
      }

      &::selection {
        background: ${props => props.theme.highlight};
      }
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

        &::-moz-selection {
          background: ${props => props.theme.highlight};
        }

        &::selection {
          background: ${props => props.theme.highlight};
        }

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
