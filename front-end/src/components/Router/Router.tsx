import { Route } from 'react-router-dom'
import Groups from '../../Pages/Groups'
import Login from '../../Pages/Login'
import SignUp from '../../Pages/SignUp'
import CreateRoom from '../../Pages/CreateRoom'
import JoinRoom from '../../Pages/JoinRoom'
import Home from '../../Pages/Home'
import Authenticated from '../Other/Authenticated'
import { ComponentTransition, AnimationTypes } from 'react-component-transition'
import { Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ErrorPage from '../UI/Error'

export interface IRouterProps {}

export default function Router(props: IRouterProps) {
  return (
    <ComponentTransition
      enterAnimation={AnimationTypes.fade.enter}
      exitAnimation={AnimationTypes.fade.exit}
    >
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/group/:id'>
          <Authenticated action='chat'>
            <Groups />
          </Authenticated>
          <Route path='/group/invite/:id/:name'>
            <Authenticated action='create invites'>
              <Groups />
            </Authenticated>
          </Route>
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signUp'>
          <SignUp />
        </Route>
        <Route path='/create'>
          <Authenticated action='create rooms'>
            <CreateRoom />
          </Authenticated>
        </Route>
        <Route path='/join'>
          <Authenticated action='join rooms'>
            <JoinRoom />
          </Authenticated>
        </Route>
        <Route path='*'>
          <ErrorPage
            title='404'
            link='/'
            message='No page found'
            recommend='Go to home by clicking'
          />
        </Route>
      </Switch>
      <ToastContainer toastStyle={{ backgroundColor: 'black', color: 'white' }} />
    </ComponentTransition>
  )
}
