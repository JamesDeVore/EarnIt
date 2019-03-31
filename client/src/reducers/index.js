import {combineReducers} from "redux";
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import {foodReducer} from './foodReducer'
import {mapsReducer} from './mapsReducer'

export default combineReducers({
  auth:authReducer,
  error:errorReducer,
  food:foodReducer,
  maps:mapsReducer
})