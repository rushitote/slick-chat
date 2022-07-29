import React, { useContext, useEffect } from 'react'
import Router from './components/Router/Router'
import loggedInContext from './utils/Contexts/loggedInContext'
import isAuthenticated from './utils/isAuthenticated'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
export interface IAppProps {}

export default function App(props: IAppProps) {
  const { setIsLoggedIn } = useContext(loggedInContext)
  useEffect(() => {
    const asyncWrapper = async () => {
      console.log('running')
      let isLoggedIn = await isAuthenticated()
      setIsLoggedIn(isLoggedIn)
    }
    asyncWrapper()
  }, [setIsLoggedIn])

  return <Router />
}
