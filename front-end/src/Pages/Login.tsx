import styles from './Login.module.css'
import LoginForm from '../components/Login/LoginForm'
import About from '../components/Login/About'
import { ToastContainer } from 'react-toastify'
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  return (
    <>
      <div className={styles['root']}>
        <About title='Login' />
        <LoginForm />
        <ToastContainer toastStyle={{ backgroundColor: 'black', color: 'white' }} />
      </div>
    </>
  )
}
