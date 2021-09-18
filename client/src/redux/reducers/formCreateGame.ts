import actions from '../actions';
import {
  GetUsersInfoActionTypes,
  IChatState,
  IChatUsers,
  ISetUsers,
} from '../types/chat';
import {
  createGameAction,
  CreateGameActionTypes,
  getMasterGameAction,
  GetMasterInfoActionTypes,
  IGetGameState,
  IMasterState,
} from '../types/forms';

const initialState: IMasterState = {
  master: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
  error: null,
};
const initialGameState: IGetGameState = {
  IDGame: '',
  error: null,
};
const initialUsersState: IChatState = {
  users: {
    members: [],
    observers: [],
    master: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
  },
};
export const formCreateReducer = (
  state: IGetGameState = initialGameState,
  action: createGameAction,
): IGetGameState => {
  switch (action.type) {
    case CreateGameActionTypes.FETCH_CREATE_GAME:
      return {
        IDGame: '',
        error: null,
      };
    case CreateGameActionTypes.FETCH_CREATE_GAME_SUCCESS:
      return {
        ...state,
        error: null,
        IDGame: action.payload.IDGame,
      };
    case CreateGameActionTypes.FETCH_CREATE_GAME_ERROR:
      return {
        IDGame: '',
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
export const formGetMasterReducer = (
  state: IMasterState = initialState,
  action: getMasterGameAction,
): IMasterState => {
  switch (action.type) {
    case GetMasterInfoActionTypes.FETCH_GET_MASTER:
      return {
        master: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
        error: null,
      };
    case GetMasterInfoActionTypes.FETCH_GET_MASTER_SUCCESS:
      return {
        ...state,
        error: null,
        master: action.payload?.master,
      };
    case GetMasterInfoActionTypes.FETCH_GET_MASTER_ERROR:
      return {
        master: { name: '', lastName: '', jobPosition: '', avatarURL: '' },
        error: action.payload?.error,
      };
    default:
      return state;
  }
};

export const chatReducer = (
  state: IChatState = initialUsersState,
  action: ISetUsers,
): IChatState => {
  switch (action.type) {
    case GetUsersInfoActionTypes.FETCH_SET_USERS:
      return {
        users: action.payload.users,
      };
    default:
      return state;
  }
};
