import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  AuthPage,
  GoogleSignUp,
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
import { Link } from 'react-router-dom'
import { registerAction } from '../../store/actions/userActions'
import { GoogleIcon } from '../../assets'

export const SignUp = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    userInfo && history.push('/app/today')
  }, [loading, error, userInfo, history])

  return (
    <AuthPage>
      <Title>Sign Up</Title>
      <GoogleSignUp onClick={() => dispatch(registerAction())}>
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

        <SubmitButton type='submit'>Sign up with Email</SubmitButton>
      </AuthForm> */}
      <AuthQuestion>
        Already signed up? <Link to='/login'>Go to log in!</Link>
      </AuthQuestion>
    </AuthPage>
  )
}

SignUp.propTypes = { history: PropTypes.object }
