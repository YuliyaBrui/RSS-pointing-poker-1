import {
  createGameAction,
  CreateGameActionTypes,
  IMasterState,
} from '../types/forms';

const initialState: IMasterState = {
  master: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
  error: null,
};

export const formCreateReducer = (
  state: IMasterState = initialState,
  action: createGameAction,
): IMasterState => {
  switch (action.type) {
    case CreateGameActionTypes.FETCH_CREATE_GAME:
      return {
        master: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
        error: null,
      };
    case CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS:
      return {
        ...state,
        error: null,
        master: action.payload?.master,
      };
    case CreateGameActionTypes.FETCH_CREATE_GAME_ERROR:
      return {
        master: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
