import { useState, Ref, forwardRef } from 'react'
import styles from './PasswordField.module.css'
import InputField, { IInputFieldProps } from './InputField'
import eyeOpen from '../../images/eyeOpen.png'
import eyeClosed from '../../images/eyeClosed.png'

const PasswordField = forwardRef((props: IInputFieldProps, ref: Ref<HTMLInputElement>) => {
  const showPassword = (e: any) => {
    e.preventDefault()
    setShowingPassword(!showingPassword)
  }

  const [showingPassword, setShowingPassword] = useState<boolean>(false)
  return (
    <div style={{ position: 'relative' }}>
      <InputField
        type={!showingPassword ? 'password' : 'text'}
        name='password'
        id='password'
        ref={ref}
      />
      {!props.disabled && (
        <img
          src={!showingPassword ? eyeClosed : eyeOpen}
          alt='show password'
          onClick={showPassword}
          className={styles['span-eye-btn']}
        />
      )}
    </div>
  )
})

export default PasswordField
