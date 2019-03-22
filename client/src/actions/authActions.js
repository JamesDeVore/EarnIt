import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {GET_ERRORS, SET_CURRENT_USER, USER_LOADING} from './types'

//register user

export const registerUser = (userData, history) => dispatch => {
  axios.post("/api/users/register", userData)
  .then(res => history.push("/login")) // redirect on a success
  .catch(err => dispatch({type:GET_ERRORS, payload:err.response.data}))
}

// get user token - login

export const loginUser = userData => dispatch => {
  axios.post("/api/users/login", userData)
  .then(res => {
    //save to localstorage
    const {token} = res.data
    localStorage.setItem("jwtToken", token);
    //set token to auth header
    setAuthToken(token);
    //decode token for user data
    const decoded = jwt_decode(token);
    //set current user
    dispatch(setCurrentUser(decoded))
    .catch(err => dispatch({type:GET_ERRORS, payload:err.response.data}))
  })
}

//set logged in user

export const setCurrentUser = decoded => {
  return {
    type:SET_CURRENT_USER,
    payload:decoded
  }
}

//user Loading

export const setUserLoading = () => {
  return {
    type:USER_LOADING
  }
}

//log User out

export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem("jwtToken")
  //remove auth header
  setAuthToken(false)
  //dispatch an empty object to set isAuthenticated to false
  dispatch(setCurrentUser({}))
}

