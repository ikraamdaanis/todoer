import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  AuthPage,
  GoogleSignUp,
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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.')
      return
    }
    dispatch(registerAction(false, email.trim(), password))
  }

  return (
    <AuthPage>
      <Title>Sign Up</Title>
      <GoogleSignUp onClick={() => dispatch(registerAction(true))}>
        <GoogleIcon />
        Continue with Google
      </GoogleSignUp>
      <Separator>
        <p>OR</p>
        <div className='line'></div>
      </Separator>
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
          <InputLabel>Password (6 Characters Minimum)</InputLabel>
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
        <SubmitButton type='submit'>Sign up with Email</SubmitButton>
      </AuthForm>
      <AuthQuestion>
        Already signed up? <Link to='/login'>Go to log in!</Link>
      </AuthQuestion>
    </AuthPage>
  )
}

SignUp.propTypes = { history: PropTypes.object }
