import styled from 'styled-components/macro'

export const AuthPage = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background: #fafafa;
  width: 100vw;
`

export const TodoerLogoContainer = styled.div`
  text-align: left;
  margin-bottom: 14px;
  height: 25px;

  a {
    img {
      height: 100%;
    }
  }
`

export const AuthContent = styled.div`
  box-sizing: content-box;
  background: ${props => props.theme.background};
  margin: 0 auto;
  border-radius: 8px;
  margin: 50px 0;
  border-radius: 8px;
  border: solid 1px #dbdbdb;
  width: 400px;
  max-width: 95%;
  padding: 25px;
  height: min-content;

  @media (max-width: 770px) {
    padding-top: 98px;
  }
`
export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: ${props => props.theme.textColour};
  margin: 0 0 1.1em;
  padding: 0;
`
export const GoogleSignUp = styled.button`
  cursor: pointer;
  width: 100%;
  height: 40px;
  font-weight: 400;
  font-size: 13px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  outline: none;
  background: ${props => props.theme.dropdown};
  color: ${props => props.theme.textColour};
  transition: 0.2s ease-in-out;

  &:hover {
    filter: brightness(0.9);
    border: 1px solid ${props => props.theme.active};
  }

  svg {
    margin-right: 10px;
  }
`

export const Separator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 1.5rem 0;

  p {
    background: ${props => props.theme.background};
    color: #4e4e4e;
    position: relative;
    z-index: 1;
    padding: 0 1.5rem;
  }

  .line {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-45%);
    z-index: 0;
    border-bottom: 1px solid ${props => props.theme.border};
    border-top: 1px solid transparent;
  }
`

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: #dd4b39;
  padding: 0.5em 0;
  margin-bottom: 1rem;

  .warning {
    background: url('https://d3ptyyxy2at9ui.cloudfront.net/all_images-94aa31.png') 0 0 no-repeat;
    background-position: 0 -65px;
    width: 16px;
    height: 16px;
    margin-right: 6px;
  }

  span {
    font-size: 13px;
  }
`

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.textColour};
`

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 1rem;
`

export const InputLabel = styled.label`
  display: block;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 5px;
`

export const Input = styled.input`
  width: 100%;
  font-size: 13px;
  font-weight: 400;
  width: 100%;
  padding: 0.75em 1em;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textColour};
  border-radius: 5px;
  outline: 0;
  background: ${props => props.theme.background};

  &:focus {
    border: 1px solid #1746aa;
  }
`

export const SubmitButton = styled.button`
  cursor: pointer;
  text-align: center;
  display: block;
  height: auto;
  width: 100%;
  font-size: 13px !important;
  font-weight: 700;
  padding: 9px 12px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #db4c3f;
  color: #fff !important;
  text-shadow: none;
  border: 1px solid transparent;
  margin: 1rem 0 0;
  transition: 0.2s ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
`

export const AuthQuestion = styled.p`
  margin-top: 30px;
  text-align: center;
  font-size: 13px;
  padding-bottom: 10px;
  font-weight: 500;

  a {
    color: ${props => props.theme.lightRed};
  }
`
