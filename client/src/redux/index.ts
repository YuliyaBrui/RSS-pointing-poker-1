import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  formConnectMemberReducer,
  formConnectObserverReducer,
} from './reducers/formConnect';
import { formCreateReducer } from './reducers/formCreateGame';
import { addGameCards } from './reducers/gameCards';
import { addIssue } from './reducers/issues';
import { setGameSetting } from './reducers/setGameSetting';

const rootReducer = combineReducers({
  gameSetting: setGameSetting,
  issues: addIssue,
  gameCards: addGameCards,
  formCreateReducer,
  formConnectObserverReducer,
  formConnectMemberReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
