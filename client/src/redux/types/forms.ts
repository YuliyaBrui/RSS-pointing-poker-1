export interface IFormGameValue {
  name: string;
  lastName: string;
  jobPosition: string;
  avatarURL: string | ArrayBuffer | null;
}
export enum CreateGameActionTypes {
  FETCH_CREATE_GAME = 'FETCH_CREATE_GAME',
}
export enum ConnectGameActionTypes {
  FETCH_CONNECT_GAME = 'FETCH_CONNECT_GAME',
}
export interface IFetchCreateGameAction {
  type: CreateGameActionTypes.FETCH_CREATE_GAME;
  payload: { masters: IFormGameValue[] };
}
export interface IFormCreateGameState {
  masters: IFormGameValue[];
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
