import { ADD_GAME_CARD, DELETE_GAME_CARD } from '../actions/gameCards';
import { IGameCard } from '../types/gameCard';

const initialState = [
  { cardValue: 1, id: 1 },
  { cardValue: 2, id: 2 },
  { cardValue: 3, id: 3 },
];

export const addGameCards = (
  state = initialState,
  action: { type: string; gameCard: IGameCard },
): any => {
  switch (action.type) {
    case ADD_GAME_CARD:
      return [...state, action.gameCard];
    case DELETE_GAME_CARD:
      return state.filter((el) => el.id !== action.gameCard.id);
    default:
      return state;
  }
};
