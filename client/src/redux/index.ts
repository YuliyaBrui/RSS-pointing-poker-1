import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

const rooReducer = combineReducers({});

export const store = createStore(rooReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
