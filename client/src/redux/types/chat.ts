import { IFormGameValue } from './forms';

export interface IChatUsers {
  members: IFormGameValue[];
  observers: IFormGameValue[];
  master: IFormGameValue;
}
export interface IChatState {
  users: IChatUsers;
}
export enum GetUsersInfoActionTypes {
  FETCH_SET_USERS = 'FETCH_SET_USERS',
}

export interface ISetUsers {
  type: GetUsersInfoActionTypes.FETCH_SET_USERS;
  payload: {
    users: IChatUsers;
  };
}
