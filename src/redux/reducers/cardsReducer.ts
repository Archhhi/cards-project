import {AppActionTypes, AppDispatch, ThunkActionType} from "../store";
import {CardsType} from "../../types/types";
import {cardsAPI, ResponseCardsGetType} from "../../api/api";
import {getPacksTC} from "./packsReducer";

// Action creators type
export type CardsActionType = ReturnType<typeof setCardsAC>
export type CardsPackIDType = ReturnType<typeof setCardsPackIdAC>

// All action types
export type CardsActionTypes = CardsActionType | CardsPackIDType

// State type
export type CardsStateType = typeof initialState

// State
const initialState = {
  cards: [] as CardsType[],
  cardTotalCount: null as null | string,
  maxGrade: null as null | number,
  minGrade: null as null | number,
  page: null as null | number,
  pageCount: null as null | number,
  packUserId: null as null | string,
  token: null as null | string,
  tokenDeathTime: null as null | number,

  cardsPack_id: null as null | string
}

// Reducer
export const cardsReducer = (state = initialState, action: AppActionTypes): CardsStateType => {
  switch (action.type) {
    case 'SET_CARDS':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_CARDSPACKID':
      return {
        ...state,
        cardsPack_id: action._id
      }
    default:
      return state
  }
}

// Action creators
export const setCardsAC = (data: ResponseCardsGetType) => {
  return {
    type: 'SET_CARDS', payload: data
  } as const
}
export const setCardsPackIdAC = (_id: string) => {
  return {
    type: 'SET_CARDSPACKID', _id
  } as const
}

// Thunk creators
export const getCardsTC = (_id: string): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    const response = await cardsAPI.getCards(_id)
    dispatch(setCardsAC(response.data))
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
export const addCardTC = (cardsPack_id: string, question: string, answer: string): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    await cardsAPI.addCard(cardsPack_id, question, answer)
    dispatch(getCardsTC(cardsPack_id))
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
export const updateCardTC = (cardsPack_id: string, _id: string, question: string): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    await cardsAPI.updateCard(_id, question)
    dispatch(getCardsTC(cardsPack_id))
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
export const deleteCardTC = (cardsPack_id: string, _id: string): ThunkActionType => async (dispatch: AppDispatch, getState: any) => {
  try {
    await cardsAPI.deleteCard(_id)
    dispatch(getCardsTC(cardsPack_id))
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}