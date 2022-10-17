import axios from 'axios'
import toast from '../components/UI/Toast'

const login = async (usernameRef: any, passwordRef: any) => {
  const jsonResponse = JSON.stringify({
    username: usernameRef.current?.value,
    password: passwordRef.current?.value,
  })
  try {
    const response = await axios.post(`${process.env.REACT_APP_HOST}/login`, jsonResponse, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
const logout = async () => {
  try {
    let res = await axios.post(`${process.env.REACT_APP_HOST}/logout`, null, {
      withCredentials: true,
    })
    if (res.status === 200) {
      localStorage.removeItem('username')
      toast((res as any).data.msg)
      return true
    }
  } catch (e) {
    console.log('Error while logging out')
    console.log(e)
  }
}

export { logout, login }
