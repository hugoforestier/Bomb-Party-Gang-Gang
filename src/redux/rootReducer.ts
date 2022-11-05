import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { removeAuthTokenFromClient } from '../webClient';
import loginReducer, { resetLoginReducer } from './reducers/login/loginReducer';
import userReducer, { getUser } from './reducers/user/userReducer';
import connectionReducer from './reducers/websocket/connectionReducer';
import infoHandlerReducer from './reducers/websocket/infoHandlerReducer';

const reducers = combineReducers({
  login: loginReducer,
  websocket: connectionReducer,
  infoHandler: infoHandlerReducer,
  user: userReducer,
});

const rootReducers = (state: any, action: PayloadAction<any>) => {
  if (action.type === resetLoginReducer().type
    || (action.type === getUser.rejected.type && action.payload === 401)) {
    removeAuthTokenFromClient();
    window.location.reload();
    return reducers(undefined, action);
  }
  return reducers(state, action);
};

export default rootReducers;
