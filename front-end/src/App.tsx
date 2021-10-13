import { Route } from 'react-router-dom'
import Groups from './Pages/Groups'
export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <Route path="/group/:id">
      <Groups />
    </Route>
  )
}
