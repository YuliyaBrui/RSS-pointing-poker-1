import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'react';

import instance from '../../service/api';
import {
  chatInfoAction,
  GetUsersInfoActionTypes,
  IChatState,
} from '../types/chat';
import {
  createGameAction,
  CreateGameActionTypes,
  IFormGameValue,
} from '../types/forms';

export const saveMasterParams =
  (value: IFormGameValue, callback: (gameID: string) => void) =>
  async (dispatch: Dispatch<createGameAction>): Promise<void> => {
  console.log(value);

    try {
    dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME,
    });
    const response: AxiosResponse<string> = await instance.post('/', {
        master: value,
      });
    const gameID = response.data;
      dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS,
        payload: { IDGame: response.data },
    });
    callback(gameID);
  } catch (e) {
      dispatch({
        type: CreateGameActionTypes.FETCH_CREATE_GAME_ERROR,
        payload: { error: 'Error' },
    });
  }
  };

export const getUsersParams =
  (IDGame: string, callback: (master: IFormGameValue) => void) =>
  async (dispatch: Dispatch<chatInfoAction>): Promise<void> => {
    const response: AxiosResponse<IChatState> = await instance.get(
      `/${IDGame}`,
  );

    dispatch({
    type: GetUsersInfoActionTypes.FETCH_SET_USERS,
      payload: {
        users: response.data.users,
      },
  });
    dispatch({
    type: GetUsersInfoActionTypes.FETCH_SET_MESSAGES,
    payload: {
      messages: response.data.messages,
    },
    });
    dispatch({
    type: GetUsersInfoActionTypes.FETCH_SET_ISSUES,
    payload: {
      issues: response.data.issues,
    },
    });

    callback(response.data.users.master);
};
