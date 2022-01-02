import styles from './Home.module.css'
import react_logo from '../images/react.png'
import NavBar from '../components/UI/Navbar'
import { Link } from 'react-router-dom'
export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <div className={styles['root']}>
      <NavBar id={styles['navbar']} />
      <div className={styles['top']}>
        <div className={styles['app']}>
          <h1 id={styles['app-name']}>A place to hang out with your friends</h1>
          <p id={styles['app-about']}>
            Modern chatting applications have gotten too complex. Embrace the simplicity of Free Chat to chat with your
            friends securely and privately
          </p>
          <Link to='/login' id={styles['get-started-btn']}>
            Get Started
          </Link>
        </div>
        <img id={styles['react-spinning-image']} alt='typescript' src={react_logo} title='React Logo' />
      </div>
    </div>
  )
}
