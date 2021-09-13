import {
  CreateGameActionTypes,
  IFetchCreateGameAction,
  IFormCreateGameState,
} from '../types/forms';

const initialState: IFormCreateGameState = {
  masters: [],
};

export const formCreateReducer = (
  state: IFormCreateGameState = initialState,
  action: IFetchCreateGameAction,
): IFormCreateGameState => {
  switch (action.type) {
    case CreateGameActionTypes.FETCH_CREATE_GAME:
      return {
        ...state,
        masters: action.payload?.masters,
      };
    default:
      return state;
  }
};
