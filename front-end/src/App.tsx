import { Route } from 'react-router-dom'
import Groups from './Pages/Groups'
import Login from './Pages/Login'
import Status from './Pages/Status'
export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <>
      <Route path="/group/:id">
        <Groups />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/testAuth">
        <Status />
      </Route>
    </>
  )
}
