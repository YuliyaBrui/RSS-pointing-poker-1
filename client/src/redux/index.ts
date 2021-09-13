import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { addIssue } from './reducers/issues';
import { formReducer } from './reducers/formCreateGame';
import { addGameCards } from './reducers/gameCards';
import { setGameSetting } from './reducers/setGameSetting';

const rootReducer = combineReducers({
  gameSetting: setGameSetting,
  formReducer,
  issues: addIssue,
  gameCards: addGameCards,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
