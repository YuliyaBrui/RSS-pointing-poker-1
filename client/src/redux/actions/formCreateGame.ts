import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';

import instance from '../../service/api';
import { GetUsersInfoActionTypes, IChatUsers, ISetUsers } from '../types/chat';
import {
  createGameAction,
  CreateGameActionTypes,
  getMasterGameAction,
  GetMasterInfoActionTypes,
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

export const saveMasterParams =
  (value: IFormGameValue) =>
  async (dispatch: Dispatch<createGameAction>): Promise<void> => {
    console.log(value);
    try {
      dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME,
      });
      const response: AxiosResponse<string> = await instance.post('/', {
        master: value,
      });
      dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS,
        payload: { IDGame: response.data },
      });
    } catch (e) {
      dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME_ERROR,
        payload: { error: 'Error' },
      });
    }
  };

export const getMasterParams =
  (IDGame: string) =>
  async (dispatch: Dispatch<getMasterGameAction>): Promise<void> => {
    try {
      dispatch({
        type: GetMasterInfoActionTypes.FETCH_GET_MASTER,
      });
      const response: AxiosResponse<IFormGameValue> = await instance.get(
        `/${IDGame}`
      );
      dispatch({
        type: GetMasterInfoActionTypes.FETCH_GET_MASTER_SUCCESS,
        payload: {
          master: response.data,
        },
      });
    } catch (e) {
      dispatch({
        type: GetMasterInfoActionTypes.FETCH_GET_MASTER_ERROR,
        payload: { error: 'Error' },
      });
    }
  };
export const getUsersParams =
  (IDGame: string) =>
  async (dispatch: Dispatch<ISetUsers>): Promise<void> => {
    const response: AxiosResponse<IChatUsers> = await instance.get(
      `/${IDGame}`,
    );
    dispatch({
      type: GetUsersInfoActionTypes.FETCH_SET_USERS,
      payload: {
        users: response.data,
      },
    });
  };
