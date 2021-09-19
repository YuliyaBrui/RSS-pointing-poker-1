import { IFormGameValue } from './forms';

export interface IChatUsers {
  members: IFormGameValue[];
  observers: IFormGameValue[];
  master: IFormGameValue;
}
export interface IMessage {
  text: string;
  name: string;
  avatar: string;
}
export interface IChatState {
  users: IChatUsers;
  messages: IMessage[];
}
export type chatInfoAction =
  | IFetchUsersAction
  | IFetchMessagesAction
  | IFetchNewMessageAction;
export enum GetUsersInfoActionTypes {
  FETCH_SET_USERS = 'FETCH_SET_USERS',
  FETCH_SET_MESSAGES = 'FETCH_SET_MESSAGES',
  FETCH_ADD_MESSAGE = 'FETCH_ADD_MESSAGE',
}

export interface IFetchUsersAction {
  type: GetUsersInfoActionTypes.FETCH_SET_USERS;
  payload: {
    users: IChatUsers;
  };
}
export interface IFetchMessagesAction {
  type: GetUsersInfoActionTypes.FETCH_SET_MESSAGES;
  payload: {
    messages: IMessage[];
  };
}
export interface IFetchNewMessageAction {
  type: GetUsersInfoActionTypes.FETCH_ADD_MESSAGE;
  payload: {
    message: IMessage;
  };
}
