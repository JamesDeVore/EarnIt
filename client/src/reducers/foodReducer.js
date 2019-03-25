import {SELECT_FOOD} from "../actions/types"

export const foodReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_FOOD:
      return {...state,...action.payload}
    default:
      return state
  }
}