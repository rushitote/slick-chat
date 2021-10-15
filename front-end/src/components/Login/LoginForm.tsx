import styles from './LoginForm.module.css'
import { useContext, useRef } from 'react'
import loggedInContext from '../../utils/Contexts/loggedInContext'
import Button from '../UI/Button'
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
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" ref={usernameRef} />
      </div>
      <div className={styles['pair']}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      <Button text="Login" loginHandler={loginHandler} />
    </form>
  )
}
