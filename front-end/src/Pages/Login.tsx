import styles from './Login.module.css'
import LoginForm from '../components/Login/LoginForm'
import About from '../components/Login/About'
import { useEffect } from 'react'
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  useEffect(() => {
    document.title = 'Slick Chat | Login'
  }, [])

  return (
    <>
      <div className={styles['root']}>
        <About title='Login' />
        <LoginForm />
      </div>
    </>
  )
}
