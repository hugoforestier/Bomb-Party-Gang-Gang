import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import loginReducer from './reducers/login/loginReducer';
import connectionReducer from './reducers/websocket/connectionReducer';
import infoHandlerReducer from './reducers/websocket/infoHandlerReducer';

const reducers = combineReducers({
  login: loginReducer,
  websocket: connectionReducer,
  infoHandler: infoHandlerReducer,
});

const rootReducers = (state: any, action: PayloadAction<any>) => reducers(state, action);

export default rootReducers;
