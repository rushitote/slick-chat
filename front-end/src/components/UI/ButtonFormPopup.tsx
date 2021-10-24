import styles from './ButtonFormPopup.module.css'
export interface IBottomFormPopupProps {
  show: boolean
  children: any
  message: string
}

export default function BottomFormPopup(props: IBottomFormPopupProps) {
  return (
    <div className={`${styles['bottom']} ${props.show ? styles['show'] : ''}`}>
      <div
        className={`${styles['error-message']} ${
          props.show ? styles['show'] : ''
        }`}
      >
        {props.message}
      </div>
      {props.children}
    </div>
  )
}
