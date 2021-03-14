import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
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

export const HeroButton = styled(Link)`
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
    margin: 2rem auto;
  }

  @media (max-width: 1120px) {
    margin: -8rem auto;
  }

  @media (max-width: 770px) {
    margin: -4rem auto;

    &.screenshot {
      margin: 0rem auto;
    }
  }

  @media (max-width: 480px) {
    margin: -2rem auto;
  }
`

export const FreeUp = styled.section`
  padding: 4rem 1rem 6rem;
  text-align: center;
  background: ${props => props.theme.background};
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;

  @media (max-width: 1000px) {
    bottom: -5%;
  }

  @media (max-width: 800px) {
    bottom: -10%;
  }

  @media (max-width: 750px) {
    bottom: -15%;
  }

  @media (max-width: 600px) {
    bottom: -20%;
  }

  @media (max-width: 500px) {
    bottom: -25%;
  }

  @media (max-width: 480px) {
    bottom: -50%;
  }

  @media (max-width: 400px) {
    bottom: -70%;
  }
  /* transform: translateY(-400px);

  @media (max-width: 900px) {
    transform: translateY(-400px);
  }
  @media (max-width: 700px) {
    transform: translateY(-250px);
  }
  @media (max-width: 500px) {
    transform: translateY(-200px);
  } */

  @media (max-width: 660px) {
    padding: 2.5rem 1rem 6rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem 6rem;
    transform: translateY(-100px);
    text-align: left;
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

  @media (max-width: 480px) {
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

  @media (max-width: 480px) {
    margin: 0 1.5rem 0 0;
    font-size: 14px;
  }
`
