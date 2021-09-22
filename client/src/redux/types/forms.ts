export interface IFormGameValue {
  name: string;
  lastName: string;
  jobPosition: string;
  avatarURL: string | ArrayBuffer | null;
  id: string;
}

export interface IGetGameState {
  IDGame: string;
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
