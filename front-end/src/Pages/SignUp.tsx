import styles from './Login.module.css'
import SignUpForm from '../components/SignUp/SignUpForm'
import About from '../components/Login/About'
export interface ILoginProps {
  setPrompt: Function //changes if user signed up successfully
}

export default function Login(props: ILoginProps) {
  return (
    <div className={styles['root']}>
      <About title="Sign Up" />
      <SignUpForm setPrompt={props.setPrompt} />
    </div>
  )
}
