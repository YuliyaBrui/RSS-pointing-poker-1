import React from 'react';
import MembersLobby from '../pages/MembersLobby/MembersLobby';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SettingPage from '../pages/SettingPage/SettingPage';
import StartPage from '../pages/StartPage/StartPage';
import GamePage from '../pages/GamePage/GamePage';
import GamePageMember from '../pages/GamePageMember/GamePageMember';
import ResultPage from '../pages/ResultPage/ResultPage';

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export const publicRoutes: IRoute[] = [
  { path: '/', exact: true, component: StartPage },
  { path: '/not-found-page', exact: true, component: NotFoundPage },
];

export const privateRoutes: IRoute[] = [
  { path: '/', exact: true, component: StartPage },
  { path: '/not-found-page', exact: true, component: NotFoundPage },
  { path: '/setting', exact: true, component: SettingPage },
  { path: '/setting/:id', exact: true, component: SettingPage },
  { path: '/lobby/:id', exact: true, component: MembersLobby },
  { path: '/game/:id', exact: true, component: GamePage },
  { path: '/game-member/:id', exact: true, component: GamePageMember },
  { path: '/result/:id', exact: true, component: ResultPage },
];
