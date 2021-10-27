import axios from 'axios'
import { User } from '../ResponseInterfaces/Interfaces'

const isValidRoom = (roomId: string): boolean => {
  const validRoomRegex = /^\d{10}$/
  return validRoomRegex.test(roomId)
}

const roomExists = async (roomId: string) => {
  try {
    const response = await axios.get('http://localhost:3000/rooms/get', {
      params: {
        roomId,
      },
      withCredentials: true,
    })
    const users: User[] = (response.data as any).users as User[]
    return users.length !== 0
  } catch (e) {
    console.log(e)
    throw new Error('Cannot check for room')
  }
}

// generates a random ID for the room
// then checks if that room already exists
const generateRandomRoom = async () => {
  while (true) {
    const roomId = Math.random().toString().slice(2, 12)
    if (await roomExists(roomId)) {
      continue
    } else {
      return roomId
    }
  }
}

export { generateRandomRoom, isValidRoom, roomExists }
