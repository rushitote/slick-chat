import React from 'react'
import About from '../components/Login/About'
import NavBar from '../components/UI/Navbar'
export interface IUserPage {}

export default function UserPage(props: IUserPage) {
  return (
    <>
      <NavBar />
      <About title='User Page' />
    </>
  )
}
