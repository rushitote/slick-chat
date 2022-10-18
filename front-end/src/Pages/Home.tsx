import styles from './Home.module.css'
import react_logo from '../images/react.png'
import NavBar from '../components/UI/Navbar'
import { Link, Redirect } from 'react-router-dom'
import Technologies from '../components/Home/Technologies'
import loggedInContext from '../utils/Contexts/loggedInContext'
import { useContext } from 'react'
export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const { isLoggedIn } = useContext(loggedInContext)
  if (isLoggedIn === undefined) return null
  if (isLoggedIn) {
    return <Redirect to='/group/landing' />
  }
  return (
    <div className={styles['root']}>
      <NavBar id={styles['navbar']} />
      <div className={styles['top']}>
        <div className={styles['app']}>
          <h1 id={styles['app-name']}>A place to chat with your friends</h1>
          <p id={styles['app-about']}>
            Modern chatting applications have gotten too complex. Embrace the simplicity of Slick
            Chat to chat with your friends securely and privately.
          </p>
          <div className={styles['btn-bar']}>
            <Link to='/login' id={styles['get-started-btn']} className={styles['btn']}>
              Get Started
            </Link>
            <a
              href='https://github.com/rushitote/chat-app'
              id={styles['github-btn']}
              className={styles['btn']}
            >
              View us on Github
            </a>
          </div>
          <p id={styles['app-footer']}>Made with &hearts; by Rushikesh and Shashwat</p>
        </div>
        <img
          id={styles['react-spinning-image']}
          alt='typescript'
          src={react_logo}
          title='React Logo'
        />
      </div>
      <Technologies id={styles['technology']} />
    </div>
  )
}
