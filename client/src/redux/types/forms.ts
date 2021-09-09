export interface IFormCreateGame {
  name: string;
  lastName: string;
  jobPosition: string;
}
export enum CreateGameActionTypes {
  FETCH_CREATE_GAME = 'FETCH_CREATE_GAME',
}

export interface IFetchCreateGameAction {
  type: CreateGameActionTypes.FETCH_CREATE_GAME;
  payload: { masters: IFormCreateGame[] };
}
export interface IFormCreateGameState {
  masters: IFormCreateGame[];
}
