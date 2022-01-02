import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
export interface INavBarProps {
  id?: string
}

export default function NavBar(props: INavBarProps) {
  return (
    <ul className={styles['navbar']} id={props.id || ''}>
      <Link id={styles['app-name']} to='/'>
        Free Chat
      </Link>
      <Link to='/create'>Create</Link>
      <Link to='/join'>Join</Link>
      <Link to='/signup' id={styles['account-sign-up']}>
        Sign Up
      </Link>
      <Link to='/login'>Login</Link>
    </ul>
  )
}
