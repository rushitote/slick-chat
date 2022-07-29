import { Route, useLocation } from 'react-router-dom'
import Groups from '../../Pages/Groups'
import Login from '../../Pages/Login'
import SignUp from '../../Pages/SignUp'
import CreateRoom from '../../Pages/CreateRoom'
import JoinRoom from '../../Pages/JoinRoom'
import Home from '../../Pages/Home'
import Authenticated from '../Other/Authenticated'
import { ComponentTransition, AnimationTypes } from 'react-component-transition'
import { Switch } from 'react-router-dom'

export interface IRouterProps {}

export default function Router(props: IRouterProps) {
  const location = useLocation()
  return (
    <ComponentTransition
      enterAnimation={AnimationTypes.fade.enter}
      exitAnimation={AnimationTypes.fade.exit}
    >
      <Switch key={location.key} location={location}>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/group/:id'>
          <Authenticated>
            <Groups />
          </Authenticated>
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
        <Route path='/join'>
          <JoinRoom />
        </Route>
      </Switch>
    </ComponentTransition>
  )
}
