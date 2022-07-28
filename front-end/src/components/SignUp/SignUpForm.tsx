import styles from './SignUpForm.module.css'
import { useRef } from 'react'
import Button from '../UI/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import BottomFormPopup from '../UI/ButtonFormPopup'
import InputField from '../UI/InputField'
import toast from '../UI/Toast'

export interface ISignUpForm {}

export default function SignUpForm(props: ISignUpForm) {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const [errorShow, setErrorShow] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()
  const signUpHandler = (e: any) => {
    e.preventDefault()
    if (usernameRef.current?.value.trim().length === 0) {
      setErrorMessage('Username cannot be empty')
      setErrorShow(true)
    } else if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setErrorMessage("Your passwords don't match")
      setErrorShow(true)
    } else {
      setErrorShow(false)
      setErrorMessage('')

      const signUp = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/create`, {
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
          toast('Account Successfully created')
          history.push('/login')
        }
      }
      signUp()
    }
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
      <div className={styles['pair']}>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <InputField type='password' name='confirmPassword' id='confirmPassword' ref={confirmPasswordRef} />
      </div>
      <BottomFormPopup show={errorShow} message={errorMessage}>
        <Button text='Create account' onClick={signUpHandler} />
        <div className={styles['register-text']}>
          <p>Already have an account?</p>
          <p>
            Login by clicking <Link to='/login'> here</Link>
          </p>
        </div>
      </BottomFormPopup>
    </form>
  )
}
