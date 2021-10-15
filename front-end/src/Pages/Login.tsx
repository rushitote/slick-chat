import { useRef, useContext } from 'react'
import Container from '../components/UI/Container'
import loggedInContext from '../utils/Contexts/loggedInContext'
import styles from './Login.module.css'
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const { isLoggedIn, updateLogIn } = useContext(loggedInContext)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const loginInHandler = (e: any) => {
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
      updateLogIn(validCredentials)
    }
    login()
  }
  if (!isLoggedIn) {
    return (
      <Container>
        <form className={styles['form']}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" ref={usernameRef} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
          />
          <button type="submit" onClick={loginInHandler}>
            Login
          </button>
        </form>
      </Container>
    )
  } else {
    return <h1>Logged in successfully</h1>
  }
}
