import {
  CreateGameActionTypes,
  IFetchCreateGameAction,
  IFormGameValue,
} from '../types/forms';

export const saveMasterParams = (
  value: IFormGameValue,
): IFetchCreateGameAction => ({
  type: CreateGameActionTypes.FETCH_CREATE_GAME,
  payload: { masters: [value] },
});
