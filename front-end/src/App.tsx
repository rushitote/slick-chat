import React, { useCallback, useContext, useEffect } from 'react'
import Router from './components/Router/Router'
import loggedInContext from './utils/Contexts/loggedInContext'
import isAuthenticated from './utils/isAuthenticated'
import Notification from './components/UI/Notification'
import { useRef } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { createPortal } from 'react-dom'
export interface IAppProps {}

export default function App(props: IAppProps) {
  const { setIsLoggedIn } = useContext(loggedInContext)
  const notifRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const asyncWrapper = async () => {
      console.log('running')
      let isLoggedIn = await isAuthenticated()
      setIsLoggedIn(isLoggedIn)
    }
    asyncWrapper()
  }, [setIsLoggedIn])

  const showNotification = useCallback((message: string) => {
    if (notifRef.current !== null) {
      notifRef.current.querySelector('div')!.innerText = message
      notifRef.current.classList.add('show')
    }
  }, [])
  const hideNotification = useCallback(() => {
    console.log('remove')
    if (notifRef.current !== null) {
      notifRef.current.classList.remove('show')
    }
  }, [])

  return (
    <>
      <Router showNotification={showNotification} hideNotification={hideNotification} />
      {createPortal(
        <Notification ref={notifRef} hideNotification={hideNotification} />,
        document.getElementById('notification')!
      )}
    </>
  )
}
