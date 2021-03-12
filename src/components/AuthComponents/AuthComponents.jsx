import styled from 'styled-components/macro'

export const AuthPage = styled.div`
  background: var(--dark-gray);
  margin: 50px auto;
  border-radius: 8px;
  border: solid 1px ${props => props.theme.taskForm};
  padding: 25px;
  width: 500px;
  max-width: 95%;
`
export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: var(--text-white);
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
  border: 1px solid #1d1d1d;
  border-radius: 5px;
  outline: none;
  background: #242424;
  color: var(--text-white);
  transition: 0.2s ease-in-out;

  &:hover {
    background: #2c2c2c;
    border: 1px solid #363636;
  }

  img {
    margin-right: 10px;
  }
`

export const Separator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 2rem 0;

  p {
    background: var(--dark-gray);
    color: #4e4e4e;
    position: relative;
    z-index: 1;
    padding: 0 1.5rem;
  }

  .line {
    position: absolute;
    height: 1px;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-45%);
    background: #4e4e4e;
    z-index: 0;
  }
`

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--text-white);
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
  border: 1px solid var(--very-dark-gray);
  color: var(--text-white);
  border-radius: 5px;
  outline: 0;
  background: #242424;

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

export const AuthQuestion = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 13px;
  padding-bottom: 10px;
  font-weight: 500;

  a {
    color: var(--light-red);
  }
`
