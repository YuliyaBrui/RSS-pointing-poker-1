import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { chatReducer } from './reducers/chat';
import { addCurrentUser } from './reducers/currentUser';
import { formCreateReducer } from './reducers/formCreateGame';
import { addGameCards } from './reducers/gameCards';
import { addIssueReducer } from './reducers/issues';
import { kickForm } from './reducers/kickForm';
import { setGameSetting } from './reducers/setGameSetting';

const rootReducer = combineReducers({
  gameSetting: setGameSetting,
  addIssueReducer,
  gameCards: addGameCards,
  formCreateReducer,
  chatReducer,
  currentUser: addCurrentUser,
  kickUserData: kickForm,
  
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
