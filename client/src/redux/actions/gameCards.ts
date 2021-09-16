import { IGameCard } from '../types/gameCard';

export const ADD_GAME_CARD = 'ADD_GAME_CARD';
export const CHANGE_GAME_CARD_VALUE = 'CHANGE_GAME_CARD_VALUE';
export const DELETE_GAME_CARD = 'DELETE_GAME_CARD';

export const addGameCards = (gameCard: IGameCard): any => ({
  type: ADD_GAME_CARD,
  gameCard,
});

export const changeGameCardValue = (gameCard: IGameCard): any => ({
  type: CHANGE_GAME_CARD_VALUE,
  gameCard,
});

export const deleteGameCard = (gameCard: number): any => ({
  type: DELETE_GAME_CARD,
  gameCard,
});
