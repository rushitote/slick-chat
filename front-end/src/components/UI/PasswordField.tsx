import * as React from 'react'
import styles from './PasswordField.module.css'
import { useState } from 'react'
import InputField, { IInputFieldProps } from './InputField'
import { Ref } from 'react'
import eyeBtn from '../../images/eyeBtn.png'
import { forwardRef } from 'react'

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
          <img src={eyeBtn} alt='' />
        </button>
      )}
    </span>
  )
})

export default PasswordField
