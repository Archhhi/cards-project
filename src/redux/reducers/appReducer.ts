import {AppActionTypes, AppDispatch, ThunkActionType} from "../store";
import {getAuthUserData} from "./loginReducer";

// Action types
export type InitializingSuccessType = ReturnType<typeof InitializingSuccess>

// All action types
export type AppReducerActionTypes = InitializingSuccessType

// State type
export type AppStateType = typeof initialState

// State
const initialState = {
  initializing: false
}

// Reducer
export const appReducer = (state = initialState, action: AppActionTypes): AppStateType => {
  switch (action.type) {
    case 'INITIALIZING_SUCCESS':
      return {
        ...state,
        initializing: true
      }
    default:
      return state
  }
}

// Action creators
export const InitializingSuccess = () => ({type: 'INITIALIZING_SUCCESS'} as const)

// Thunk creators
export const initializingApp = (): ThunkActionType => async (dispatch: AppDispatch) => {
  const promise = dispatch(getAuthUserData())
  Promise.all([promise])
    .then(() => {
      dispatch(InitializingSuccess())
    })
}