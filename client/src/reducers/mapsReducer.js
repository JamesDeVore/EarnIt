import {FIND_PLACES} from '../actions/types'

export const mapsReducer = (state = {}, action) => {
  let {type,payload} = action
  switch (type) {
    case FIND_PLACES:
      return {...state,...payload.json}
    default:
      return state
  }
}