import {AppActionTypes, AppDispatch, ThunkActionType} from "../store";
import {CardPacksType} from "../../types/types";
import {cardsAPI, ResponsePacksGetType} from "../../api/api";
import {removeError, setAuthError} from "./loginReducer";

// Action creators type

// All action types
export type PacksActionTypes = ReturnType<typeof getPacksAC>

// State type
export type PacksStateType = typeof initialState

// State
const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: null as null | number,
  maxCardsCount: null as null | number,
  minCardsCount: null as null | number,
  page: null as null | number,
  pageCount: null as null | number,
  token: null as null | string,
  tokenDeathTime: null as null | number,
}

// Reducer
export const packsReducer = (state = initialState, action: AppActionTypes): PacksStateType => {
  switch (action.type) {
    case 'GET_PACKS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

// Action creators
export const getPacksAC = (data: ResponsePacksGetType) => {
  return {
    type: 'GET_PACKS', payload: data
  } as const
}

// Thunk creators
export const getPacksTC = (): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    const response = await cardsAPI.getPacks()
    debugger
    dispatch(getPacksAC(response.data))
  } catch (e) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console')
    dispatch(setAuthError(error))

    setTimeout(() => {
      dispatch(removeError())
    }, 6000)
  }
}