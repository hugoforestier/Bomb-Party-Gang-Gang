import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import loginReducer from './reducers/login/loginReducer';

const reducers = combineReducers({
  login: loginReducer,
});

const rootReducers = (state: any, action: PayloadAction<any>) => reducers(state, action);

export default rootReducers;
