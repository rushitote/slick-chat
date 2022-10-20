import styles from './Login.module.css'
import SignUpForm from '../components/SignUp/SignUpForm'
import About from '../components/Login/About'
import { useEffect } from 'react'
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  useEffect(() => {
    document.title = 'Slick Chat | Sign up'
  }, [])

  return (
    <div className={styles['root']}>
      <About title='Sign Up' />
      <SignUpForm />
    </div>
  )
}
