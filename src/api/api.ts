import axios from "axios";
import {ForgotDataType} from "../redux/reducers/recoveryPasswordReducer";
import {PasswordDataType} from "../redux/reducers/enterNewPasswordReducer";
import {CardPacksType, CardsType} from "../types/types";

export type AuthResponseType = {
  addedUser: {}
  error?: string
}

const instance = axios.create({
  // https://neko-back.herokuapp.com/2.0
  // http://localhost:7542/2.0

  baseURL:"http://localhost:7542/2.0",
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
  logout() {
    return instance.delete('auth/me', {})
  },
}

export const forgotAPI = (data: ForgotDataType)=> {
  return instance.post('auth/forgot', data);
}

export const setNewPasswordAPI = (password: PasswordDataType)=> {
  return instance.post('auth/set-new-password', password);
}

export const cardsAPI = {
  getPacks(user_id?: string | null, packName?: string) {
    debugger
    return instance.get<ResponsePacksGetType>(`cards/pack`, {params: {page: 1, pageCount: 7, user_id, packName}})
  },
  getSortedPacks(min: number | null, max: number | null, user_id?: string | null, packName?: string) {
    return instance.get<ResponsePacksGetType>(`cards/pack`, {params: {page: 1, pageCount: 7, user_id, min, max, packName}})
  },
  getPaginatedPacks(page: number, min: number, max: number, user_id?: string | null) {
    return instance.get<ResponsePacksGetType>(`cards/pack`, {params: {page, pageCount: 7, user_id, min, max}})
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

  getCards(cardsPack_id?: string | null, page: number | null = 1, pageCount: number | null = 7, cardQuestion?: string) {
    return instance.get<ResponseCardsGetType>(`cards/card`, {params: {cardsPack_id, page, pageCount, cardQuestion}})
  },
  getCardsByPageNumber(page: number, cardsPack_id?: string | null, pageCount: number | null = 7, cardQuestion?: string) {
    return instance.get<ResponseCardsGetType>(`cards/card`, {params: {cardsPack_id, page, pageCount, cardQuestion}})
  },
  addCard(cardsPack_id: string, question: string, answer: string, grade: number) {
    return instance.post<ResponseCardsGetType>(`cards/card`, {card: {cardsPack_id, question, answer, grade}})
  },
  updateCard(_id: string, question: string, answer: string) {
    return instance.put(`cards/card`, {card: {_id, question, answer}})
  },
  deleteCard(id: string) {
    return instance.delete(`cards/card?id=${id}`)
  },
}