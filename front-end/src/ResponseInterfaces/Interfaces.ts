export interface User {
  username: string
  userId: string
}

export interface AuthenticatedResponse {
  authenticated: boolean
  user?: User
}
