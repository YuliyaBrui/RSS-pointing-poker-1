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
export enum CreateGameActionTypes {
  FETCH_CREATE_GAME = 'FETCH_CREATE_GAME',
  FETCH_CREATE_GAME_SUCCESS = 'FETCH_CREATE_GAME_SUCCESS',
  FETCH_CREATE_GAME_ERROR = 'FETCH_CREATE_GAME_ERROR',
}
export type createGameAction =
  | IFetchCreateGameAction
  | IFetchCreateGameSuccessAction
  | IFetchCreateGameErrorAction;
export enum ConnectGameActionTypes {
  FETCH_CONNECT_GAME = 'FETCH_CONNECT_GAME',
}
export interface IFetchCreateGameAction {
  type: CreateGameActionTypes.FETCH_CREATE_GAME;
}
export interface IFetchCreateGameSuccessAction {
  type: CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS;
  payload: { master: IFormGameValue };
}
export interface IFetchCreateGameErrorAction {
  type: CreateGameActionTypes.FETCH_CREATE_GAME_ERROR;
  payload: { error: string };
}

export interface IFetchConnectObserverGameAction {
  type: ConnectGameActionTypes.FETCH_CONNECT_GAME;
  payload: { observers: IFormGameValue[] };
}
export interface IFormConnectObserverGameState {
  observers: IFormGameValue[];
}
export interface IFetchConnectMemberGameAction {
  type: ConnectGameActionTypes.FETCH_CONNECT_GAME;
  payload: { members: IFormGameValue[] };
}
export interface IFormConnectMemberGameState {
  members: IFormGameValue[];
}
