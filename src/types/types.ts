export type CardPacksType = {
  _id: string
  user_id: string
  more_id: string
  private: boolean
  name: string
  user_name: string
  path: string
  cardsCount: number
  grade: number
  shots: number
  rating: number
  type: string
  created: Date
  updated: Date
  __v: number
}
export type CardsType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  rating: number
  shots: number
  type: string
  user_id: string
  created: Date
  updated: Date
  __v: number
  _id: string
}