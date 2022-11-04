import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import loginReducer from './reducers/login/loginReducer';
import userReducer from './reducers/user/userReducer';
import connectionReducer from './reducers/websocket/connectionReducer';
import infoHandlerReducer from './reducers/websocket/infoHandlerReducer';

const reducers = combineReducers({
  login: loginReducer,
  websocket: connectionReducer,
  infoHandler: infoHandlerReducer,
  user: userReducer,
});

const rootReducers = (state: any, action: PayloadAction<any>) => reducers(state, action);

export default rootReducers;
