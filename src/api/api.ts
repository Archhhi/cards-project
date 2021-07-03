import axios from "axios";
import {ForgotDataType} from "../redux/reducers/recoveryPasswordReducer";
import {PasswordDataType} from "../redux/reducers/enterNewPasswordReducer";
import {CardPacksType} from "../types/types";

export type AuthResponseType = {
  addedUser: {}
  error?: string
}

const instance = axios.create({
  // игната сервак, на локальном не работает, потом изменить, на нашем хироку
  baseURL:"http://localhost:7542/2.0/",
  withCredentials: true,
})

type ResponseLoginPostType = {
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
export type ResponsePacksGetType = {
  cardPacks: CardPacksType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export const authAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<ResponseLoginPostType>('auth/login', {email, password, rememberMe})
  },
  auth(email: string, password: string) {
    return instance.post<AuthResponseType>('auth/register', {email, password})
  },
  me() {
    return instance.post<ResponseLoginPostType>('auth/me', {})
  },
}

export const forgotAPI = (data: ForgotDataType)=> {
  return instance.post('auth/forgot', data);
}

export const setNewPasswordAPI = (password: PasswordDataType)=> {
  return instance.post('auth/set-new-password', password);
}

export const cardsAPI = {
  getPacks(page = 1, pageCount = 7) {
    return instance.get<ResponsePacksGetType>(`cards/pack?page=${page}&pageCount=${pageCount}`)
  },
  updatePacks(id: string, name: string) {
    return instance.put(`cards/pack?id=${id}&name=${name}`)
  },
  deletePacks(id: string) {
    return instance.delete(`cards/pack?id=${id}`)
  }
}