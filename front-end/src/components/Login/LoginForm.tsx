import styles from './LoginForm.module.css'
import { useContext, useRef } from 'react'
import loggedInContext from '../../utils/Contexts/loggedInContext'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'
import InputField from '../UI/InputField'
export interface IAppProps {}

export default function App(props: IAppProps) {
  const { isLoggedIn, setIsLoggedIn } = useContext(loggedInContext)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const loginHandler = (e: any) => {
    e.preventDefault()
    const login = async () => {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
        }),
      })
      const validCredentials = response.ok
      if (validCredentials) {
        console.log('Logged in successfully')
      }
      setIsLoggedIn(validCredentials)
    }
    login()
  }

  return (
    <form className={styles['form']}>
      <div className={styles['pair']}>
        <label htmlFor='username'>Username</label>
        <InputField
          type='text'
          name='username'
          id='username'
          ref={usernameRef}
        />
      </div>
      <div className={styles['pair']}>
        <label htmlFor='password'>Password</label>
        <InputField
          type='password'
          name='password'
          id='password'
          ref={passwordRef}
        />
      </div>
      <Button text='Login' onClick={loginHandler} />
      <div className={styles['register-text']}>
        <p> Not registered? </p>
        <p>
          You can create an account for free <Link to='/signUp'> here</Link>
        </p>
      </div>
    </form>
  )
}
