import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  z-index: -1;
  max-width: 1256px;
  margin: -10rem auto;
  width: 100%;

  img {
    width: 100%;
  }

  &.flowers {
    margin: 0 auto;
    z-index: -2;
  }

  &.screenshot {
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
