import * as React from 'react'
import { forwardRef } from 'react'
import { Ref } from 'react'
import styles from './InputField.module.css'
export interface IInputFieldProps {
  placeholder?: string
  type?: string
  className?: string
  value?: string
  disabled?: boolean
  [x: string]: any
}

const InputField = forwardRef(
  (props: IInputFieldProps, ref: Ref<HTMLInputElement>) => {
    return (
      <input
        className={`${props.className || ''} ${styles['input']}`}
        type={props.type || 'text'}
        placeholder={props.placeholder || ''}
        ref={ref}
        {...props}
      />
    )
  }
)

export default InputField
