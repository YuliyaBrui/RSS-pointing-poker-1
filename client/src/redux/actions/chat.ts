import {
  chatInfoAction,
  GetUsersInfoActionTypes,
  IChatUsers,
  IMessage,
} from '../types/chat';
import { IIssue } from '../types/issues';
import { createGameAction, CreateGameActionTypes } from '../types/forms';

export const chatParams = (users: IChatUsers): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_SET_USERS,
  payload: { users },
});
export const newMessageParams = (message: IMessage): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_ADD_MESSAGE,
  payload: { message },
});
export const chatMessageParams = (messages: IMessage[]): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_SET_MESSAGES,
  payload: { messages },
});
export const addIssue = (issue: IIssue): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_ADD_ISSUE,
  payload: { issue },
});
export const gameIssues = (issues: IIssue[]): chatInfoAction => ({
  type: GetUsersInfoActionTypes.FETCH_SET_ISSUES,
  payload: { issues },
});

export const addGameID = (gameID: string): createGameAction => ({
  type: CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS,
  payload: { IDGame: gameID },
});