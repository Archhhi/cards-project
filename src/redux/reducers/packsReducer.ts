import {AppActionTypes, AppDispatch, RootStateType, ThunkActionType} from "../store";
import {CardPacksType} from "../../types/types";
import {cardsAPI, ResponsePacksGetType} from "../../api/api";

// Action creators type
export type PacksActionType = ReturnType<typeof setPacksAC>
export type SetIsModeAddType = ReturnType<typeof setIsModeAdd>
export type SetIsModeEditType = ReturnType<typeof setIsModeEdit>
export type SetIsModeDeleteType = ReturnType<typeof setIsModeDelete>
export type SetIsModeLearnType = ReturnType<typeof setIsModeLearn>
export type SetIsModalTextType = ReturnType<typeof setModalText>
export type SetMinMaxCardsValuesType = ReturnType<typeof setMinMaxCardsValues>
export type SetIdType = ReturnType<typeof setId>
export type SetOnModeType = ReturnType<typeof setOnMode>
export type SetSearchInputValueType = ReturnType<typeof setSearchInputValue>
export type SetOnDisabledType = ReturnType<typeof setOnDisabled>

// All action types
export type PacksActionTypes = PacksActionType
  | SetIsModeAddType
  | SetIsModeEditType
  | SetIsModeDeleteType
  | SetIsModeLearnType
  | SetIsModalTextType
  | SetIdType
  | SetOnModeType
  | SetSearchInputValueType
  | SetMinMaxCardsValuesType
  | SetOnDisabledType

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

  settedMinCardsValue: 0,
  settedMaxCardsValue: 103,
  isModeAdd: false,
  isModeEdit: false,
  isModeDelete: false,
  isModeLearn: false,
  modalText: '' as string,
  id: '' as string,
  onMode: 'pending' as string,
  searchInputValue: '' as string,
  onDisabled: false
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
    case 'SET_IS_MODE_LEARN':
      return {
        ...state,
        isModeLearn: action.isMode
      }
    case 'SET_MIN_MAX_CARDS_VALUES':
      return {
        ...state,
        settedMinCardsValue: action.settedMinCardsValue,
        settedMaxCardsValue: action.settedMaxCardsValue,

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
    case 'SET_ON_MODE':
      return {
        ...state,
        onMode: action.mode
      }
    case 'SET_SEARCH_INPUT_VALUE':
      return {
        ...state,
        searchInputValue: action.value
      }
    case 'SET_ON_DISABLED':
      return {
        ...state,
        onDisabled: action.mode
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
export const setIsModeLearn = (isMode: boolean) => {
  return {
    type: 'SET_IS_MODE_LEARN', isMode
  } as const
}
export const setMinMaxCardsValues = (settedMinCardsValue: number, settedMaxCardsValue: number) => {
  return {
    type: 'SET_MIN_MAX_CARDS_VALUES', settedMinCardsValue, settedMaxCardsValue
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
export const setOnMode = (mode: string) => {
  return {
    type: 'SET_ON_MODE', mode
  } as const
}
export const setSearchInputValue = (value: string) => {
  return {
    type: 'SET_SEARCH_INPUT_VALUE', value
  } as const
}
export const setOnDisabled = (mode: boolean) => {
  return {
    type: 'SET_ON_DISABLED', mode
  } as const
}

// Thunk creators
export const getPacksTC = (user_id?: string | null): ThunkActionType =>
  async (dispatch: AppDispatch, getState: () => RootStateType) => {
    const state = getState().packs
    try {
      const response = await cardsAPI.getPacks(user_id, state.searchInputValue)
      dispatch(setPacksAC(response.data))
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }
export const getSortedPacksTC = (min: number | null, max: number | null, user_id?: string | null): ThunkActionType =>
  async (dispatch: AppDispatch, getState: () => RootStateType) => {
    const state = getState().packs
    try {
      if ((min || min === 0) && max) {
        dispatch(setMinMaxCardsValues(min, max))
        const response = await cardsAPI.getSortedPacks(min, max, user_id, state.searchInputValue)
        dispatch(setPacksAC(response.data))
      }
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }
export const getPacksByPageNumberTC = (
  page: number,
  min: number | null,
  max: number | null,
  user_id?: string | null): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    if ((min || min === 0) && max) {
      const response = await cardsAPI.getPaginatedPacks(page, min, max, user_id)
      dispatch(setPacksAC(response.data))
    } else {
    }
  } catch (e) {
    console.log(JSON.stringify(e))
  }
}
export const addPackTC = (name: string): ThunkActionType =>
  async (dispatch: AppDispatch, getState: () => RootStateType) => {
    const state = getState().login
    try {
      await cardsAPI.addPack(name)
      dispatch(getPacksTC(state._id))
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }
export const updatePackTC = (_id: string, name: string): ThunkActionType =>
  async (dispatch: AppDispatch, getState: () => RootStateType) => {
    const state = getState().login
    try {
      await cardsAPI.updatePack(_id, name)
      dispatch(getPacksTC(state._id))
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }
export const deletePackTC = (_id: string): ThunkActionType =>
  async (dispatch: AppDispatch, getState: () => RootStateType) => {
    const state = getState().login
    try {
      await cardsAPI.deletePack(_id)
      dispatch(getPacksTC(state._id))
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }