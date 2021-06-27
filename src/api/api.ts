import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
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
  }
}