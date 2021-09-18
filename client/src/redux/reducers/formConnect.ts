import {
  IFormConnectMemberGameState,
  IFormConnectObserverGameState,
  JoinMemberActionTypes,
  joinMemberGameAction,
  JoinObserverActionTypes,
  joinObserverGameAction,
} from '../types/forms';

const initialObserverState: IFormConnectObserverGameState = {
  observers: [],
  error: null,
};
const initialMemberState: IFormConnectMemberGameState = {
  members: [],
  error: null,
};
/* export const formConnectObserverReducer = (
  state: IFormConnectObserverGameState = initialObserverState,
  action: IFetchConnectObserverGameAction,
): IFormConnectObserverGameState => {
  switch (action.type) {
    case ConnectGameActionTypes.FETCH_CONNECT_GAME:
      return {
        ...state,
        observers: action.payload?.observers,
      };
    default:
      return state;
  }
}; */
export const formConnectObserverReducer = (
  state: IFormConnectObserverGameState = initialObserverState,
  action: joinObserverGameAction,
): IFormConnectObserverGameState => {
  switch (action.type) {
    case JoinObserverActionTypes.FETCH_JOIN_OBSERVER:
      return {
        observers: [],
        error: null,
      };
    case JoinObserverActionTypes.FETCH_JOIN_OBSERVER_SUCCESS:
      return {
        ...state,
        error: null,
        observers: action.payload.observers,
      };
    case JoinObserverActionTypes.FETCH_JOIN_OBSERVER_ERROR:
      return {
        observers: [],
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
export const formConnectMemberReducer = (
  state: IFormConnectMemberGameState = initialMemberState,
  action: joinMemberGameAction,
): IFormConnectMemberGameState => {
  switch (action.type) {
    case JoinMemberActionTypes.FETCH_JOIN_MEMBER:
      return {
        members: [],
        error: null,
      };
    case JoinMemberActionTypes.FETCH_JOIN_MEMBER_SUCCESS:
      return {
        ...state,
        error: null,
        members: action.payload.members,
      };
    case JoinMemberActionTypes.FETCH_JOIN_MEMBER_ERROR:
      return {
        members: [],
        error: action.payload?.error,
      };
    default:
      return state;
  }
};
/*
export const formConnectMemberReducer = (
  state: IFormConnectMemberGameState = initialMemberState,
  action: IFetchConnectMemberGameAction
): IFormConnectMemberGameState => {
  switch (action.type) {
    case ConnectGameActionTypes.FETCH_CONNECT_GAME:
      return {
        ...state,
        members: action.payload?.members,
      };
    default:
      return state;
  }
};
 */

/* export const sessionReducer = (state: ISessionState = sessionState, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        userName: action.payload.userName,
        gameId: action.payload.gameId,
      };

    case 'SET_DATA':
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};
*/
