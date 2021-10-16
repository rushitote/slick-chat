import { useContext, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import Groups from './Pages/Groups'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import loggedInContext from './utils/Contexts/loggedInContext'
import isAuthenticated from './utils/isAuthenticated'
import './App.css'
export interface IAppProps {}

export default function App(props: IAppProps) {
  const { isLoggedIn, setIsLoggedIn } = useContext(loggedInContext)
  useEffect(() => {
    const asyncWrapper = async () => {
      console.log('running')
      setIsLoggedIn(await isAuthenticated())
    }
    asyncWrapper()
  }, [setIsLoggedIn])
  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false)
  return (
    <>
      <Route path="/group/:id">
        <Groups />
      </Route>
      <Route path="/login">
        <Login
          showPrompt={registeredSuccessfully}
          setPrompt={setRegisteredSuccessfully}
        />
      </Route>
      <Route path="/signUp">
        <SignUp setPrompt={setRegisteredSuccessfully} />
      </Route>
    </>
  )
}
