import {AppActionTypes, AppDispatch, ThunkActionType} from "../store";
import {CardPacksType} from "../../types/types";
import {cardsAPI, ResponsePacksGetType} from "../../api/api";

// Action creators type
export type PacksActionType = ReturnType<typeof setPacksAC>
export type SetIsModeAddType = ReturnType<typeof setIsModeAdd>
export type SetIsModeEditType = ReturnType<typeof setIsModeEdit>
export type SetIsModeDeleteType = ReturnType<typeof setIsModeDelete>
export type SetIsModalTextType = ReturnType<typeof setModalText>
export type SetIdType = ReturnType<typeof setId>

// All action types
export type PacksActionTypes = PacksActionType
  | SetIsModeAddType
  | SetIsModeEditType
  | SetIsModeDeleteType
  | SetIsModalTextType
  | SetIdType

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

  isModeAdd: false,
  isModeEdit: false,
  isModeDelete: false,
  modalText: '' as string,
  id: '' as string
}

// Reducer
export const packsReducer = (state = initialState, action: AppActionTypes): PacksStateType => {
  switch (action.type) {
    case 'SET_PACKS':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_IS_MODE_ADD':
      return {
        ...state,
        isModeAdd: action.isMode
      }
    case 'SET_IS_MODE_EDIT':
      return {
        ...state,
        isModeEdit: action.isMode
      }
    case 'SET_IS_MODE_DELETE':
      return {
        ...state,
        isModeDelete: action.isMode
      }
    case 'SET_MODAL_TEXT':
      return {
        ...state,
        modalText: action.name
      }
    case 'SET_ID':
      return {
        ...state,
        id: action.id
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
export const setIsModeAdd = (isMode: boolean) => {
  return {
    type: 'SET_IS_MODE_ADD', isMode
  } as const
}
export const setIsModeEdit = (isMode: boolean) => {
  return {
    type: 'SET_IS_MODE_EDIT', isMode
  } as const
}
export const setIsModeDelete = (isMode: boolean) => {
  return {
    type: 'SET_IS_MODE_DELETE', isMode
  } as const
}
export const setModalText = (name: string) => {
  return {
    type: 'SET_MODAL_TEXT', name
  } as const
}
export const setId = (id: string) => {
  return {
    type: 'SET_ID', id
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