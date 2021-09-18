import { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import instance from '../../service/api';
import { GetUsersInfoActionTypes, IChatUsers, ISetUsers } from '../types/chat';
import {
  IFormGameValue,
  JoinMemberActionTypes,
  joinMemberGameAction,
  JoinObserverActionTypes,
  joinObserverGameAction,
} from '../types/forms';

/* export const saveObserverParams = (
  value: IFormGameValue,
): IFetchConnectObserverGameAction => ({
  type: ConnectGameActionTypes.FETCH_CONNECT_GAME,
  payload: { observers: [value] },
});
export const saveMemberParams = (
  value: IFormGameValue,
): IFetchConnectMemberGameAction => ({
  type: ConnectGameActionTypes.FETCH_CONNECT_GAME,
  payload: { members: [value] },
}); */
/*export const saveObserverParams =
  (value: IFormGameValue, IDGame: string) =>
  async (dispatch: Dispatch<joinObserverGameAction>): Promise<void> => {
    console.log(value);
    try {
      dispatch({
        type: JoinObserverActionTypes.FETCH_JOIN_OBSERVER,
      });
      const response: AxiosResponse<IFormGameValue[]> = await instance.post(
        `/${IDGame}/observers`,
        {
          observer: value,
        }
      );
      dispatch({
        type: JoinObserverActionTypes.FETCH_JOIN_OBSERVER_SUCCESS,
        payload: { observers: response.data },
      });
    } catch (e) {
      dispatch({
        type: JoinObserverActionTypes.FETCH_JOIN_OBSERVER_ERROR,
        payload: { error: 'Error' },
      });
    }
  };
export const saveMemberParams =
  (value: IFormGameValue, IDGame: string) =>
  async (dispatch: Dispatch<joinMemberGameAction>): Promise<void> => {
    console.log(value);
    try {
      dispatch({
        type: JoinMemberActionTypes.FETCH_JOIN_MEMBER,
      });
      const response: AxiosResponse<IFormGameValue[]> = await instance.post(
        `/${IDGame}/members`,
        {
          member: value,
        }
      );
      dispatch({
        type: JoinMemberActionTypes.FETCH_JOIN_MEMBER_SUCCESS,
        payload: { members: response.data },
      });
    } catch (e) {
      dispatch({
        type: JoinMemberActionTypes.FETCH_JOIN_MEMBER_ERROR,
        payload: { error: 'Error' },
      });
    }
  };
/* export const saveMemberParams = (
  value: IFormGameValue,
): IFetchConnectMemberGameAction => ({
  type: ConnectGameActionTypes.FETCH_CONNECT_GAME,
  payload: { members: [value] },
}); */
*/
export const chatParams = (users: IChatUsers): ISetUsers => ({
  type: GetUsersInfoActionTypes.FETCH_SET_USERS,
  payload: { users },
});
