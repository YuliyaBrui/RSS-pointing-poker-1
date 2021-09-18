export interface IFormGameValue {
  name: string;
  lastName: string;
  jobPosition: string;
  avatarURL: string | ArrayBuffer | null;
}
export interface IMasterState {
  master: IFormGameValue;
  error: null | string | undefined;
}
export interface IGetGameState {
  IDGame: string;
  error: null | string | undefined;
}
export interface IFormConnectObserverGameState {
  observers: IFormGameValue[];
  error: null | string | undefined;
}
export interface IFormConnectMemberGameState {
  members: IFormGameValue[];
  error: null | string | undefined;
}

export enum CreateGameActionTypes {
  FETCH_CREATE_GAME = 'FETCH_CREATE_GAME',
  FETCH_CREATE_GAME_SUCCESS = 'FETCH_CREATE_GAME_SUCCESS',
  FETCH_CREATE_GAME_ERROR = 'FETCH_CREATE_GAME_ERROR',
}

export enum GetMasterInfoActionTypes {
  FETCH_GET_MASTER = 'FETCH_GET_MASTER',
  FETCH_GET_MASTER_SUCCESS = 'FETCH_GET_MASTER_SUCCESS',
  FETCH_GET_MASTER_ERROR = 'FETCH_GET_MASTER_ERROR',
}
export enum JoinObserverActionTypes {
  FETCH_JOIN_OBSERVER = 'FETCH_JOIN_OBSERVER',
  FETCH_JOIN_OBSERVER_SUCCESS = 'FETCH_JOIN_OBSERVER_SUCCESS',
  FETCH_JOIN_OBSERVER_ERROR = 'FETCH_JOIN_OBSERVER_ERROR',
}
export enum JoinMemberActionTypes {
  FETCH_JOIN_MEMBER = 'FETCH_JOIN_MEMBER',
  FETCH_JOIN_MEMBER_SUCCESS = 'FETCH_JOIN_MEMBER_SUCCESS',
  FETCH_JOIN_MEMBER_ERROR = 'FETCH_JOIN_MEMBER_ERROR',
}
export type createGameAction =
  | IFetchCreateGameAction
  | IFetchCreateGameSuccessAction
  | IFetchCreateGameErrorAction;
export type getMasterGameAction =
  | IFetchGetMasterAction
  | IFetchGetMasterSuccessAction
  | IFetchGetMasterErrorAction;
export type joinObserverGameAction =
  | IFetchJoinObserverAction
  | IFetchJoinObserverSuccessAction
  | IFetchJoinObserverErrorAction;
export type joinMemberGameAction =
  | IFetchJoinMemberAction
  | IFetchJoinMemberSuccessAction
  | IFetchJoinMemberErrorAction;
export interface IFetchGetMasterAction {
  type: GetMasterInfoActionTypes.FETCH_GET_MASTER;
}
export interface IFetchGetMasterSuccessAction {
  type: GetMasterInfoActionTypes.FETCH_GET_MASTER_SUCCESS;
  payload: { master: IFormGameValue };
}
export interface IFetchGetMasterErrorAction {
  type: GetMasterInfoActionTypes.FETCH_GET_MASTER_ERROR;
  payload: { error: string };
}

export interface IFetchCreateGameAction {
  type: CreateGameActionTypes.FETCH_CREATE_GAME;
}
export interface IFetchCreateGameSuccessAction {
  type: CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS;
  payload: { IDGame: string };
}
export interface IFetchCreateGameErrorAction {
  type: CreateGameActionTypes.FETCH_CREATE_GAME_ERROR;
  payload: { error: string };
}
export interface IFetchJoinObserverAction {
  type: JoinObserverActionTypes.FETCH_JOIN_OBSERVER;
}
export interface IFetchJoinObserverSuccessAction {
  type: JoinObserverActionTypes.FETCH_JOIN_OBSERVER_SUCCESS;
  payload: { observers: IFormGameValue[] };
}
export interface IFetchJoinObserverErrorAction {
  type: JoinObserverActionTypes.FETCH_JOIN_OBSERVER_ERROR;
  payload: { error: string };
}
export interface IFetchJoinMemberAction {
  type: JoinMemberActionTypes.FETCH_JOIN_MEMBER;
}
export interface IFetchJoinMemberSuccessAction {
  type: JoinMemberActionTypes.FETCH_JOIN_MEMBER_SUCCESS;
  payload: { members: IFormGameValue[] };
}
export interface IFetchJoinMemberErrorAction {
  type: JoinMemberActionTypes.FETCH_JOIN_MEMBER_ERROR;
  payload: { error: string };
}
