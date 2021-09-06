import React from 'react';
import NotFoundPage from '../components/NotFoundPage';
import StartPage from '../components/StartPage';

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
];
