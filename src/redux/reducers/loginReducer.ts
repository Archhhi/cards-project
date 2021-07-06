import {authAPI} from "../../api/api";
import {AppActionTypes, AppDispatch, ThunkActionType} from "../store";

// Action creators type
export type SetAuthUserDataType = ReturnType<typeof setAuthUserData>
export type SetAuthUserError = ReturnType<typeof setAuthError>
export type RemoveError = ReturnType<typeof removeError>

// All action types
export type AuthActionTypes = SetAuthUserDataType
  | SetAuthUserError
  | RemoveError

// State type
export type AuthStateType = typeof initialState

// State
const initialState = {
  _id: null as null | string,
  email: null as null | string,
  name: null as null | string,
  avatar: null as null | string | undefined,
  publicCardPacksCount: null as null | number,

  isAuth: false,

  error: null as null | any
}

// Reducer
export const loginReducer = (state = initialState, action: AppActionTypes): AuthStateType => {
  switch (action.type) {
    case "SET_AUTH_USER_DATA":
      return {
        ...state,
        ...action.payload
      }
    case "SET_AUTH_ERROR":
      return {
        ...state,
        error: action.error,
      }
    case "REMOVE_ERROR":
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

// Action creators
export const setAuthUserData = (
  _id: null | string,
  email: null | string,
  name: null | string,
  avatar: null | string | undefined,
  publicCardPacksCount: null | number,
  isAuth: boolean
) => ({
  type: 'SET_AUTH_USER_DATA', payload: {_id, email, name, avatar, publicCardPacksCount, isAuth}
} as const)
export const setAuthError = (error: any) => ({
  type: 'SET_AUTH_ERROR', error
} as const)
export const removeError = () => ({
  type: 'REMOVE_ERROR'
} as const)

// Thunk creators
export const login = (userEmail: string, password: string, rememberMe: boolean): ThunkActionType => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await authAPI.login(userEmail, password, rememberMe)
      const {_id, email, name, avatar, publicCardPacksCount} = response.data
      dispatch(setAuthUserData(_id, email, name, avatar, publicCardPacksCount, true))
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
}
export const logout = (): ThunkActionType => {
  return async (dispatch: AppDispatch) => {
    try {
      await authAPI.logout()
      dispatch(setAuthUserData(null, null, null, null, null,false))
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
}
export const getAuthUserData = (): ThunkActionType => async (dispatch: AppDispatch) => {
  try {
    const response = await authAPI.me()
    const {_id, email, name, avatar, publicCardPacksCount} = response.data
    dispatch(setAuthUserData(_id, email, name, avatar, publicCardPacksCount, true))
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