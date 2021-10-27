const isAuthenticated = async () => {
  const response = await fetch('http://localhost:3000/authenticated', {
    method: 'GET',
    credentials: 'include', //includes the cookies
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
  const { authenticated } = await response.json()
  // response is of format { authenticated: true|false}
  return authenticated
}

export default isAuthenticated
