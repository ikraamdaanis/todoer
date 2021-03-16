import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleSignUp,
  AuthPage,
  Title,
  AuthQuestion,
  FormItem,
  Input,
  InputLabel,
  Separator,
  AuthForm,
  SubmitButton,
} from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from '../../store/actions/userActions'
import { Link } from 'react-router-dom'
import { GoogleIcon } from '../../assets'

export const Login = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // userInfo && history.push('/app/today')
    console.log(userInfo, error)
    if (error) {
      setPassword('')
    }
  }, [loading, error, userInfo, history])

  const handleSubmit = event => {
    event.preventDefault()
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.')
      return
    }
    dispatch(signInAction(false, email.trim(), password))
  }

  return (
    <AuthPage>
      <Title>Log In</Title>
      <GoogleSignUp onClick={() => dispatch(signInAction(true))}>
        <GoogleIcon />
        Continue with Google
      </GoogleSignUp>
      <Separator>
        <p>OR</p>
        <div className='line'></div>
      </Separator>
      {error && <h2>The email or password is incorrect.</h2>}
      <AuthForm onSubmit={handleSubmit}>
        <FormItem>
          <InputLabel>Email</InputLabel>
          <Input
            type='email'
            id='email'
            name='email'
            title='Enter your email'
            required
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </FormItem>
        <FormItem>
          <InputLabel>Password</InputLabel>
          <Input
            type='password'
            id='password'
            name='password'
            title='Enter a password'
            minlength='6'
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormItem>

        <SubmitButton type='submit'>Sign in with Email</SubmitButton>
      </AuthForm>

      <AuthQuestion>
        Don&#39;t have an account? <Link to='/signup'>Click here to register!</Link>
      </AuthQuestion>
    </AuthPage>
  )
}

Login.propTypes = { history: PropTypes.object }
