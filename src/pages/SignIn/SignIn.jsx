import { useEffect } from 'react'
import {
  FormItem,
  GoogleSignUp,
  Input,
  InputLabel,
  Separator,
  AuthForm,
  AuthPage,
  SubmitButton,
  Title,
  AuthQuestion,
} from '../../components/'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from '../../store/actions/userActions'
import { Link } from 'react-router-dom'

export const SignIn = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  useEffect(() => {
    console.log({ loading, error, userInfo })
    userInfo && history.push('/app/today')
  }, [loading, error, userInfo])

  return (
    <AuthPage>
      <Title>Sign In</Title>
      <GoogleSignUp onClick={() => dispatch(signInAction())}>
        <img
          width='16'
          height='16'
          src='https://d3ptyyxy2at9ui.cloudfront.net/google-41de20.svg'
        />
        Sign in with Google
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
        Don't have an account? <Link to='/signup'>Click here to register!</Link>
      </AuthQuestion>
    </AuthPage>
  )
}
