import styles from './LoginForm.module.css'
import { useContext, useRef } from 'react'
import loggedInContext from '../../utils/Contexts/loggedInContext'
import Button from '../UI/Button'
import { Link, Redirect } from 'react-router-dom'
import InputField from '../UI/InputField'
import { useState, useEffect } from 'react'
import BottomFormPopup from '../UI/ButtonFormPopup'
import PasswordField from '../UI/PasswordField'
import { login } from '../../utils/auth'
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

  const loginHandler = async (e: any) => {
    e.preventDefault()

    const response = await login(usernameRef, passwordRef)
    const validCredentials = response

    if (validCredentials) {
      localStorage.setItem('username', usernameRef.current!.value)
    } else {
      setErrorMessage('Invalid Credentials')
      setErrorShow(true)
    }
    setIsLoggedIn(validCredentials)
  }
  if (isLoggedIn && redirectPath !== null) {
    sessionStorage.removeItem('lastPage')
    return <Redirect to={redirectPath} />
  } else if (isLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <form className={styles['form']}>
      <div className={styles['pair']}>
        <label htmlFor='username'>Username</label>
        <InputField type='text' name='username' id='username' ref={usernameRef} />
      </div>
      <div className={styles['pair']}>
        <label htmlFor='password'>Password</label>
        <PasswordField ref={passwordRef} />
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
