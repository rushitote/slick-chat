import styles from './LoginForm.module.css'
import { useContext, useRef } from 'react'
import loggedInContext from '../../utils/Contexts/loggedInContext'
import Button from '../UI/Button'
import { Link, Redirect } from 'react-router-dom'
import InputField from '../UI/InputField'
import { useState, useEffect } from 'react'
import toast from '../UI/Toast'
import BottomFormPopup from '../UI/ButtonFormPopup'
export interface IAppProps {}

export default function App(props: IAppProps) {
  const { isLoggedIn, setIsLoggedIn } = useContext(loggedInContext)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [redirectPath, setRedirectPath] = useState<string | null>(null)
  const [errorShow, setErrorShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setRedirectPath(sessionStorage.getItem('lastPage'))
  }, [])

  const invalidUser = () => {
    toast('Invalid Credentials')
  }

  const loginHandler = (e: any) => {
    e.preventDefault()
    const login = async () => {
      const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
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
        localStorage.setItem('username', usernameRef.current!.value)
        console.log('Logged in successfully')
      } else {
        console.log('Invalid user')
        setErrorMessage('Invalid Credentials')
        setErrorShow(true)
      }
      setIsLoggedIn(validCredentials)
    }
    login()
  }
  if (isLoggedIn && redirectPath !== null) {
    sessionStorage.removeItem('lastPage')
    return <Redirect to={redirectPath} />
  } else if (isLoggedIn) {
    return <Redirect to='/create' />
  }

  return (
    <form className={styles['form']}>
      <div className={styles['pair']}>
        <label htmlFor='username'>Username</label>
        <InputField type='text' name='username' id='username' ref={usernameRef} />
      </div>
      <div className={styles['pair']}>
        <label htmlFor='password'>Password</label>
        <InputField type='password' name='password' id='password' ref={passwordRef} />
      </div>
      <BottomFormPopup show={errorShow} message={errorMessage}>
        <Button text='Login' onClick={loginHandler} />
        <div className={styles['register-text']}>
          <p> Not registered? </p>
          <p>
            You can create an account for free <Link to='/signUp'> here</Link>
          </p>
        </div>
      </BottomFormPopup>
    </form>
  )
}
