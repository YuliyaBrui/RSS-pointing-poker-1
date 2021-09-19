import React from 'react';
import MembersLobby from '../pages/MembersLobby/MembersLobby';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SettingPage from '../pages/SettingPage/SettingPage';
import StartPage from '../pages/StartPage/StartPage';

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
  { path: '/lobby', exact: true, component: MembersLobby },
];
