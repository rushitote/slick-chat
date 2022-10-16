import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import loggedInContext from '../../utils/Contexts/loggedInContext'
import { useContext } from 'react'
import { isLoggedOut } from '../../utils/auth'
export interface INavBarProps {
  id?: string
}

export default function NavBar(props: INavBarProps) {
  const { isLoggedIn, setIsLoggedIn } = useContext(loggedInContext)
  const logoutHandler = () => {
    setIsLoggedIn(!isLoggedOut())
  }
  return (
    <ul className={styles['navbar']} id={props.id || ''}>
      <Link id={styles['app-name']} to='/'>
        Slick Chat
      </Link>
      <Link to='/create'>Create</Link>
      <Link to='/join'>Join</Link>
      {!isLoggedIn ? (
        <>
          <Link to='/signup' id={styles['account-sign-up']}>
            Sign Up
          </Link>
          <Link to='/login'>Login</Link>
        </>
      ) : (
        <Link to='/'>
          <span id={styles['account-sign-up']} onClick={logoutHandler}>
            Logout
          </span>
        </Link>
      )}
    </ul>
  )
}
