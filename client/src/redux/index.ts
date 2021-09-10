import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { formReducer } from './reducers/formCreateGame';
import { setShortScoreType } from './reducers/setShortType';

const rootReducer = combineReducers({
  shortScoreType: setShortScoreType,
  formReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
