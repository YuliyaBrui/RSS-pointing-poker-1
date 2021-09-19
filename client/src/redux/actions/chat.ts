import {
  chatInfoAction,
  GetUsersInfoActionTypes,
  IChatUsers,
  IMessage,
} from '../types/chat';

export const chatParams = (users: IChatUsers): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_SET_USERS,
  payload: { users },
});
export const newMessageParams = (message: IMessage): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_ADD_MESSAGE,
  payload: { message },
});
