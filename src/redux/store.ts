import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {profileReducer} from "./reducers/profileReducer";
import {registrationReducer} from "./reducers/registrationReducer";
import {recoveryPasswordReducer} from "./reducers/recoveryPasswordReducer";
import {enterNewPasswordReducer} from "./reducers/enterNewPasswordReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  recoveryPassword: recoveryPasswordReducer,
  enterNewPassword: enterNewPasswordReducer,
  profile: profileReducer
})

export let store = createStore(reducers, applyMiddleware(thunk) )