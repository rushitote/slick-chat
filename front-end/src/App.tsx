import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import Groups from './Pages/Groups'
import Login from './Pages/Login'
import Status from './Pages/Status'
import loggedInContext from './utils/Contexts/loggedInContext'
import isAuthenticated from './utils/isAuthenticated'
import './App.css'
export interface IAppProps {}

export default function App(props: IAppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const asyncWrapper = async () => {
      console.log('running')
      setIsLoggedIn(await isAuthenticated())
    }
    asyncWrapper()
  }, [])
  return (
    <loggedInContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        updateLogIn: setIsLoggedIn,
      }}
    >
      <Route path="/group/:id">
        <Groups />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/testAuth">
        <Status />
      </Route>
    </loggedInContext.Provider>
  )
}
