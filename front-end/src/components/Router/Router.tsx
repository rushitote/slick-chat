import { Route } from 'react-router-dom'
import Groups from '../../Pages/Groups'
import Login from '../../Pages/Login'
import SignUp from '../../Pages/SignUp'
import notificationContext from '../../utils/Contexts/notificationContext'
import CreateRoom from '../../Pages/CreateRoom'
export interface IRouterProps {
  hideNotification: Function
  showNotification: Function
}

export default function Router(props: IRouterProps) {
  const { hideNotification, showNotification } = props
  return (
    <notificationContext.Provider
      value={{ hideNotification, showNotification }}
    >
      <Route path='/group/:id'>
        <Groups />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signUp'>
        <SignUp />
      </Route>
      <Route path='/create'>
        <CreateRoom />
      </Route>
    </notificationContext.Provider>
  )
}
