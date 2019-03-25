import {SELECT_FOOD} from './types';

export const dispatchSelectFood = (foodItem) => dispatch => {
  console.log("dispatched", foodItem)
  dispatch({type:SELECT_FOOD, payload:foodItem})
}