import axios from "axios";
import {ForgotDataType} from "../redux/reducers/recoveryPasswordReducer";

const instance = axios.create({
  baseURL:  "https://neko-back.herokuapp.com/2.0/",
      //'https://cards-learn-dream-team.herokuapp.com/2.0/',
      /*'http://localhost:7542/2.0/'*/
  withCredentials: true,
})

export const forgotAPI = (data: ForgotDataType)=> {
  return instance.post('auth/forgot', data);
}

export const setNewPasswordAPI = (newPassword: string)=> {
  return instance.post('auth/set-new-password', {newPassword});
}