import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AuthActionTypes, loginReducer} from "./reducers/loginReducer";
import {profileReducer} from "./reducers/profileReducer";
import {registrationReducer} from "./reducers/registrationReducer";
import {recoveryPasswordReducer} from "./reducers/recoveryPasswordReducer";
import {enterNewPasswordReducer} from "./reducers/enterNewPasswordReducer";
import {PacksActionTypes, packsReducer} from "./reducers/packsReducer";
import {cardsReducer} from "./reducers/cardsReducer";

let reducers = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  recoveryPassword: recoveryPasswordReducer,
  enterNewPassword: enterNewPasswordReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer
})

// AppState type
export type RootStateType = ReturnType<typeof reducers>
// Actions types
export type AppActionTypes = AuthActionTypes
| PacksActionTypes
// Thunk action type
export type ThunkActionType = ThunkAction<Promise<void>, RootStateType, unknown, AppActionTypes>
// Thunk dispatch type
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionTypes>

export let store = createStore(reducers, applyMiddleware(thunkMiddleware))