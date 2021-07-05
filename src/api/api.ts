import axios from "axios";
import {ForgotDataType} from "../redux/reducers/recoveryPasswordReducer";
import {PasswordDataType} from "../redux/reducers/enterNewPasswordReducer";
import {CardPacksType, CardsType} from "../types/types";

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
export type ResponseCardsGetType = {
  cards: CardsType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
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
  addPack(name: string) {
    return instance.post(`cards/pack`, {cardsPack: {name}})
  },
  updatePack(_id: string, name: string) {
    return instance.put(`cards/pack`, {cardsPack: {_id, name}})
  },
  deletePack(id: string) {
    return instance.delete(`cards/pack?id=${id}`)
  },

  getCards(_id: string) {
    return instance.get<ResponseCardsGetType>(`cards/card?cardsPack_id=${_id}`)
  },
  addCard(cardsPack_id: string, question: string, answer: string) {
    return instance.post<ResponseCardsGetType>(`cards/card`, {card: {cardsPack_id, question, answer}})
  },
  updateCard(_id: string, question: string) {
    return instance.put(`cards/card`, {card: {_id, question}})
  },
  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`)
  },
}