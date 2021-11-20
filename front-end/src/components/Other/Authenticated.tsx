import { useContext } from 'react'
import { useLocation } from 'react-router'
import loggedInContext from '../../utils/Contexts/loggedInContext'
import ErrorPage from '../UI/Error'
export interface IAuthenticatedProps {
  children: any
}

/*
  This page is responsible for checking whether the user is authenticated
  If they are, the component renders its children
  Else it renders an error page
*/
export default function Authenticated(props: IAuthenticatedProps) {
  const location = useLocation()
  const { isLoggedIn } = useContext(loggedInContext)
  if (isLoggedIn === undefined) {
    return null
  } else if (isLoggedIn) {
    return props.children
  } else {
    sessionStorage.setItem('lastPage', location.pathname)
    return (
      <ErrorPage
        title='Not logged in'
        message='You need to login to create rooms'
        recommend='You can login by going'
        link='/login'
      />
    )
  }
}
