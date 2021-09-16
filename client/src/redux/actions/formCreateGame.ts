import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';

import instance from '../../service/api';
import {
  createGameAction,
  CreateGameActionTypes,
  IFetchCreateGameAction,
  IFormGameValue,
  IMasterState,
} from '../types/forms';
/*
 export const saveMasterParams = (
  value: IFormGameValue,
): IFetchCreateGameAction => ({
  type: CreateGameActionTypes.FETCH_CREATE_GAME,
  //payload: { masters: [value] },
});
 */

export const saveMasterParams = (value: IFormGameValue) =>
  async (dispatch: Dispatch<createGameAction>): Promise<any> => {
    console.log(value);
    dispatch({
      type: CreateGameActionTypes.FETCH_CREATE_GAME,
    });
    const response: AxiosResponse<IFormGameValue> = await instance.post('/', {
      master: value,
    });
  };

export const getMasterParams = () =>
  async (dispatch: Dispatch<createGameAction>): Promise<any> => {
    try {
      dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME,
      });
      const response: AxiosResponse<IFormGameValue> = await instance.get('/');
      dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS,
        payload: {
          master: response.data,
        },
      });
    } catch (e) {
      dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME_ERROR,
        payload: { error: 'Error' },
      });
    }
  };
