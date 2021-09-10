import React from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes } from '../../route/route';
import { HeaderPoker } from '../Header/Header';
import { FooterPoker } from '../Footer/Footer';

const { Header, Footer, Content } = Layout;

const AppRouter = (): JSX.Element => (
  <Layout>
    <Header style={{ background: '#FFC482' }}>
      <HeaderPoker />
    </Header>
    <Content>
      <Switch>
        {privateRoutes.map((route) => (
          <Route
            path={route.path}
            exact={route.exact}
            component={route.component}
            key={route.path}
          />
        ))}
        <Redirect to="/not-found-page" />
      </Switch>
    </Content>
    <Footer style={{ background: '#66999B' }}>
      <FooterPoker />
    </Footer>
  </Layout>
);

export default AppRouter;
