import {combineReducers, createStore} from "redux";
import {authReducer} from "./reducers/authReducer";
import {profileReducer} from "./reducers/profileReducer";

let reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer
})

export let store = createStore(reducers)