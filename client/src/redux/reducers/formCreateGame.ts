import {
  createGameAction,
  CreateGameActionTypes,
  IGetGameState,
} from '../types/forms';

const initialGameState: IGetGameState = {
  IDGame: '',
  error: null,
};

export const formCreateReducer = (
  state: IGetGameState = initialGameState,
  action: createGameAction,
): IGetGameState => {
  switch (action.type) {
    case CreateGameActionTypes.FETCH_CREATE_GAME:
      return {
        IDGame: '',
        error: null,
      };
    case CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS:
      return {
        ...state,
        error: null,
        IDGame: action.payload.IDGame,
      };
    case CreateGameActionTypes.FETCH_CREATE_GAME_ERROR:
      return {
        IDGame: '',
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
