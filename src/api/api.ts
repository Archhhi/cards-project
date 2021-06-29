import axios from "axios";

export type AuthResponseType = {
    addedUser: {}
    error?: string
}

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

type RequestLoginPostType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean

  error?: string
}

export const authAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<RequestLoginPostType>('auth/login', {email, password, rememberMe})
  },
  auth(email: string, password: string) {
    return instance.post<AuthResponseType>('auth/register', {email, password})
  }
}