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
} from '../../components/AuthComponents/SignUpStyles'

export const SignUp = () => {
  return (
    <AuthPage>
      <Title>Sign Up</Title>
      <GoogleSignUp>
        <img
          width='16'
          height='16'
          src='https://d3ptyyxy2at9ui.cloudfront.net/google-41de20.svg'
        />
        Sign up with Google
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
    </AuthPage>
  )
}
