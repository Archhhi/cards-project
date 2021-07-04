import {AppActionTypes, AppDispatch, ThunkActionType} from "../store";
import {CardPacksType} from "../../types/types";
import {cardsAPI, ResponsePacksGetType} from "../../api/api";

// Action creators type
export type PacksActionType = ReturnType<typeof setPacksAC>

// All action types
export type PacksActionTypes = PacksActionType

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
    case 'SET_PACKS':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

// Action creators
export const setPacksAC = (data: ResponsePacksGetType) => {
  return {
    type: 'SET_PACKS', payload: data
  } as const
}

// Thunk creators
export const getPacksTC = (): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    const response = await cardsAPI.getPacks()
    dispatch(setPacksAC(response.data))
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
export const addPackTC = (name: string): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    await cardsAPI.addPack(name)
    dispatch(getPacksTC())
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
export const updatePackTC = (_id: string, name: string): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    await cardsAPI.updatePack(_id, name)
    dispatch(getPacksTC())
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
export const deletePackTC = (_id: string): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    await cardsAPI.deletePack(_id)
    dispatch(getPacksTC())
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}