import styles from './Login.module.css'
import SignUpForm from '../components/SignUp/SignUpForm'
import About from '../components/Login/About'
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  return (
    <div className={styles['root']}>
      <About title='Sign Up' />
      <SignUpForm />
    </div>
  )
}
