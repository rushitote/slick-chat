import styles from './Login.module.css'
import LoginForm from '../components/Login/LoginForm'
import About from '../components/Login/About'
export interface ILoginProps {
  showPrompt: Boolean
  setPrompt: Function
}

export default function Login(props: ILoginProps) {
  return (
    <>
      <div className={styles['root']}>
        <About title="Login" />
        <LoginForm />
      </div>
      <div className={styles['prompt']}>
        <div
          className={`${styles['prompt-box']} ${
            props.showPrompt ? styles['show'] : ''
          }`}
        >
          <div>Your account was created successfully</div>
          <div
            className={styles['prompt-close']}
            onClick={() => {
              props.setPrompt(false)
            }}
          >
            Dismiss
          </div>
        </div>
      </div>
    </>
  )
}
