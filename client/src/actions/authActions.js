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

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

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

