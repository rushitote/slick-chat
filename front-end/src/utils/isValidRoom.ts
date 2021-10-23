const isValidRoom = (roomId: string) => {
  const regex = /^\d{10}$/
  return regex.test(roomId)
}

export default isValidRoom
