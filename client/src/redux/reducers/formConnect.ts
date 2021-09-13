import {
  ConnectGameActionTypes,
  IFetchConnectMemberGameAction,
  IFetchConnectObserverGameAction,
  IFormConnectMemberGameState,
  IFormConnectObserverGameState,
} from '../types/forms';

const initialObserverState: IFormConnectObserverGameState = {
  observers: [],
};
const initialMemberState: IFormConnectMemberGameState = {
  members: [],
};
export const formConnectObserverReducer = (
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
};
export const formConnectMemberReducer = (
  state: IFormConnectMemberGameState = initialMemberState,
  action: IFetchConnectMemberGameAction,
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
