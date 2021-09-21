import {
  chatInfoAction,
  GetUsersInfoActionTypes,
  IChatState,
} from '../types/chat';

const initialUsersState: IChatState = {
  users: {
    members: [],
    observers: [],
    master: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
  },
  user: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
  messages: [],
  issues: [],
};
export const chatReducer = (
  state: IChatState = initialUsersState,
  action: chatInfoAction,
): IChatState => {
  switch (action.type) {
    case GetUsersInfoActionTypes.FETCH_SET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case GetUsersInfoActionTypes.FETCH_SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case GetUsersInfoActionTypes.FETCH_SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case GetUsersInfoActionTypes.FETCH_ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    case GetUsersInfoActionTypes.FETCH_SET_ISSUES:
      return {
        ...state,
        issues: action.payload.issues,
      };
    case GetUsersInfoActionTypes.FETCH_ADD_ISSUE:
      return {
        ...state,
        issues: [...state.issues, action.payload.issue],
      };
    default:
      return state;
  }
};
