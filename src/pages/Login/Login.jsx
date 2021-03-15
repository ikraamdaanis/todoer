import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleSignUp,
  AuthPage,
  Title,
  AuthQuestion,
  // FormItem,
  // Input,
  // InputLabel,
  // Separator,
  // AuthForm,
  // SubmitButton,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from '../../store/actions/userActions'
import { Link } from 'react-router-dom'
import { GoogleIcon } from '../../assets'

export const Login = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    userInfo && history.push('/app/today')
  }, [loading, error, userInfo, history])

  return (
    <AuthPage>
      <Title>Log In</Title>
      <GoogleSignUp onClick={() => dispatch(signInAction())}>
        <GoogleIcon />
        Continue with Google
      </GoogleSignUp>
      {/* <Separator>
        <p>OR</p>
        <div className='line'></div>
      </Separator>
      <AuthForm>
        <FormItem>
          <InputLabel>Email</InputLabel>
          <Input type='text' title='Enter your email' required />
        </FormItem>
        <FormItem>
          <InputLabel>Password</InputLabel>
          <Input type='password' title='Enter a password' min='6' required />
        </FormItem>

        <SubmitButton type='submit'>Sign in with Email</SubmitButton>
      </AuthForm> */}

      <AuthQuestion>
        Don&#39;t have an account? <Link to='/signup'>Click here to register!</Link>
      </AuthQuestion>
    </AuthPage>
  )
}

Login.propTypes = { history: PropTypes.object }
