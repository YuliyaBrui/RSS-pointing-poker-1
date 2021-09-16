import { IGameSetting } from '../types/gameSetting';
import {
  SET_CHANGING_CARD,
  SET_MASTER_PLAYER,
  SET_NEED_TIMER,
  SET_SHORT_TYPE,
  SET_SCORE_TYPE,
  SET_ROUND_TIME,
} from '../actions/gameSetting';

const initialState = {
  masterPlayer: false,
  changingCard: false,
  needTimer: false,
  scoreType: '',
  shortScoreType: 'ST',
  roundTime: 0,
};

export const setGameSetting = (state = initialState, action: any): any => {
  switch (action.type) {
    case SET_MASTER_PLAYER:
      return { ...state, masterPlayer: action.masterPlayer };
    case SET_SHORT_TYPE:
      return { ...state, shortScoreType: action.shortScoreType };
    case SET_NEED_TIMER:
      return { ...state, needTimer: action.needTimer };
    case SET_CHANGING_CARD:
      return { ...state, changingCard: action.changingCard };
    case SET_ROUND_TIME:
      return { ...state, roundTime: action.roundTime };
    case SET_SCORE_TYPE:
      return { ...state, scoreType: action.scoreType };
    default:
      return state;
  }
};
