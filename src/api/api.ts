import axios from "axios";
import {ForgotDataType} from "../redux/reducers/recoveryPasswordReducer";
import {PasswordDataType} from "../redux/reducers/enterNewPasswordReducer";

const instance = axios.create({
  // игната сервак, на локальном не работает, потом изменить, на нашем хироку
  baseURL:  "https://neko-back.herokuapp.com/2.0/",

  withCredentials: true,
})

export const forgotAPI = (data: ForgotDataType)=> {
  return instance.post('auth/forgot', data);
}

export const setNewPasswordAPI = (password: PasswordDataType)=> {
  return instance.post('auth/set-new-password', password);
}