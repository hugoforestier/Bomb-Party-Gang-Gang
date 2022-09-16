import { combineReducers, PayloadAction } from '@reduxjs/toolkit';

const reducers = combineReducers({});

const rootReducers = (state: any, action: PayloadAction<any>) => reducers(state, action);

export default rootReducers;
