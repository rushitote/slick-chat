import styles from './Login.module.css'
import LoginForm from '../components/Login/LoginForm'
import About from '../components/Login/About'
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  return (
    <div className={styles['root']}>
      <About />
      <LoginForm />
    </div>
  )
}
