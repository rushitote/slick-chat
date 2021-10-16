import styles from './SignUpForm.module.css'
import { useRef } from 'react'
import Button from '../UI/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

function App(props: any) {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const [errorShow, setErrorShow] = useState<Boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const signUpHandler = (e: any) => {
    e.preventDefault()
    if (usernameRef.current?.value.trim().length === 0) {
      setErrorMessage('Username cannot be empty')
      setErrorShow(true)
    } else if (
      passwordRef.current?.value !== confirmPasswordRef.current?.value
    ) {
      setErrorMessage("Your passwords don't match")
      setErrorShow(true)
    } else {
      setErrorShow(false)
      setErrorMessage('')

      const signUp = async () => {
        const response = await fetch('http://localhost:3000/create', {
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
        if (!response.ok) {
          const { msg } = await response.json()
          setErrorMessage(msg)
          setErrorShow(true)
        } else {
          props.setPrompt(true)
          props.history.push('/login')
        }
      }
      signUp()
    }
  }
  return (
    <form className={styles['form']}>
      <div className={styles['pair']}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
          required
        />
      </div>
      <div className={styles['pair']}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          required
        />
      </div>
      <div className={styles['pair']}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          ref={confirmPasswordRef}
          required
        />
      </div>
      <div className={`${styles['bottom']} ${errorShow ? styles['show'] : ''}`}>
        <div
          className={`${styles['error-message']} ${
            errorShow ? styles['show'] : ''
          }`}
        >
          {errorMessage}
        </div>

        <Button text="Create account" onClick={signUpHandler} />
        <div className={styles['register-text']}>
          <p>Already have an account?</p>
          <p>
            Login by clicking <Link to="/login"> here</Link>
          </p>
        </div>
      </div>
    </form>
  )
}

export default withRouter(App)
