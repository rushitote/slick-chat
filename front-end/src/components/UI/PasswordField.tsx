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
    <span className={styles['span-eye']}>
      <InputField
        type={!showingPassword ? 'password' : 'text'}
        name='password'
        id='password'
        ref={ref}
      />
      {!props.disabled && (
        <button className={styles['span-eye-btn']} onClick={showPassword}>
          <img src={!showingPassword ? eyeClosed : eyeOpen} alt='' />
        </button>
      )}
    </span>
  )
})

export default PasswordField
