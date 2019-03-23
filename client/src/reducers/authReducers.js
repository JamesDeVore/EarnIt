import {SET_CURRENT_USER, USER_LOADING, SKIP_AUTH} from "../actions/types"

const isEmpty = require("is-empty")

const initialState = {
  isAuthenticated:false,
  user:{},
  loading:false
}

export default function(state = initialState, action){
  let {type, payload} = action
  switch(type){
    case SET_CURRENT_USER:
      return{
        ...state,
        isAuthenticated:!isEmpty(payload),
        user:payload
      }
    case USER_LOADING:
      return {...state, loading:true}
    case SKIP_AUTH:
      return {...state, isAuthenticated:true}
    default:
      return state
  }
}