import {
  ConnectGameActionTypes,
  IFetchConnectMemberGameAction,
  IFetchConnectObserverGameAction,
  IFormGameValue,
} from '../types/forms';

export const saveObserverParams = (
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
});
