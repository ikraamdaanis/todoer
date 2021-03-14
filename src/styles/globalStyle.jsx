import { createGlobalStyle } from 'styled-components/macro'

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

html {
  scroll-behavior: smooth;
}

body {
  overflow: ${props => props.theme.overflow};
  background: ${props => props.theme.background};
  color: ${props => props.theme.textColour};

  @media(max-width: 450px){
    overflow: unset;
    overflow-x: hidden;
  }
}

a {
  text-decoration: none;
  color: unset;
}

h1,
h2,
h3,
h4 {
  font-weight: 500;
}

input {
  -webkit-border-radius: 0;
  border-radius: 0;
  font-size: 16px;
}

ul{
  list-style: none;
}

select {
  font-size: 16px;
}

label {
  font-size: 14px ;
}

.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.hide {
  display: none !important;
}

.active {
  background-color: ${props => props.theme.active} !important;
}
`
