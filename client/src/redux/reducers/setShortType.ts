import { SET_SHORT_TYPE } from '../actions/setShortScoreType';

const initialState = {
  shortScoreType: 'ST',
};

export const setShortScoreType = (
  state = initialState,
  action: { type: string; shortScoreType: string },
): any => {
  switch (action.type) {
    case SET_SHORT_TYPE:
      return { state, shortScoreType: action.shortScoreType };
    default:
      return state;
  }
};
