import {FIND_PLACES} from '../actions/types'

export const mapsReducer = (state = {results:[]}, action) => {
  let {type,payload} = action
  switch (type) {
    case FIND_PLACES:
      return {...state,...payload}
    default:
      return state
  }
}