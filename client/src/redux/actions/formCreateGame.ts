import React from 'react';
import {
  CreateGameActionTypes,
  IFetchCreateGameAction,
  IFormCreateGame,
} from '../types/forms';

export const saveParams = (value: IFormCreateGame): IFetchCreateGameAction => ({
  type: CreateGameActionTypes.FETCH_CREATE_GAME,
  payload: { masters: [value] },
});
