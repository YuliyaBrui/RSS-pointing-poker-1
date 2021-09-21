import {
  chatInfoAction,
  GetUsersInfoActionTypes,
  IChatUsers,
  IMessage,
} from '../types/chat';
import { IFormGameValue } from '../types/forms';
import { IIssue } from '../types/issues';

export const chatParams = (users: IChatUsers): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_SET_USERS,
  payload: { users },
});
export const newMessageParams = (message: IMessage): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_ADD_MESSAGE,
  payload: { message },
});
export const addIssue = (issue: IIssue): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_ADD_ISSUE,
  payload: { issue },
});
export const userParams = (user: IFormGameValue): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_SET_USER,
  payload: { user },
});