import { AuthenticatedResponse } from '../ResponseInterfaces/Interfaces'

const isAuthenticated = async () => {
  const response = await fetch('http://localhost:3000/authenticated', {
    method: 'GET',
    credentials: 'include', //includes the cookies
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
  const data: AuthenticatedResponse = await response.json()

  console.log('User is', data.user)
  // response is of format { authenticated: true|false}
  // is the user is authenticated, the user object is returned
  return data.authenticated
}

export default isAuthenticated
