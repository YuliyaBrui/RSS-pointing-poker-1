import {
  chatInfoAction,
  GetUsersInfoActionTypes,
  IChatState,
} from '../types/chat';

const initialUsersState: IChatState = {
  users: {
    members: [],
    observers: [],
    master: {
      name: '',
      lastName: '',
      jobPosition: '',
      avatarURL: '',
      id: '',
    },
  },
  messages: [],
  issues: [],
  setting: {
    masterPlayer: false,
    changingCard: false,
    needTimer: false,
    scoreType: '',
    shortScoreType: 'ST',
    roundTime: 0,
  },
  gameCards: [],
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
    case GetUsersInfoActionTypes.FETCH_SET_SETTING:
      return {
        ...state,
        setting: action.payload.setting,
      };
    case GetUsersInfoActionTypes.FETCH_SET_GAME_CARDS:
      return {
        ...state,
        gameCards: action.payload.gameCards,
      };
    default:
      return state;
  }
};
