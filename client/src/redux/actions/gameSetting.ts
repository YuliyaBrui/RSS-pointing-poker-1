export const SET_MASTER_PLAYER = 'SET_MASTER_PLAYER';
export const SET_SHORT_TYPE = 'SET_SHORT_TYPE';
export const SET_NEED_TIMER = 'SET_NEED_TIMER';
export const SET_CHANGING_CARD = 'SET_CHANGING_CARD';
export const SET_SCORE_TYPE = 'SET_SCORE_TYPE';
export const SET_ROUND_TIME = 'SET_ROUND_TIME';

export const setMasterPlayer = (masterPlayer: boolean): any => ({
  type: SET_MASTER_PLAYER,
  masterPlayer,
});

export const setShortScoreType = (shortScoreType: string): any => ({
  type: SET_SHORT_TYPE,
  shortScoreType,
});

export const setNeedTimer = (needTimer: boolean): any => ({
  type: SET_NEED_TIMER,
  needTimer,
});

export const setChangingCard = (changingCard: boolean): any => ({
  type: SET_CHANGING_CARD,
  changingCard,
});

export const setScoreType = (scoreType: string): any => ({
  type: SET_SCORE_TYPE,
  scoreType,
});

export const setRoundTime = (roundTime: number): any => ({
  type: SET_ROUND_TIME,
  roundTime,
});
