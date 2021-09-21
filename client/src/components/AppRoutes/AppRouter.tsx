import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { privateRoutes } from '../../route/route';
import { HeaderPoker } from '../Header/Header';
import { FooterPoker } from '../Footer/Footer';
import { socket } from '../../socket';
import { chatParams, userParams } from '../../redux/actions/chat';
import { IChatUsers } from '../../redux/types/chat';
import { IFormGameValue } from '../../redux/types/forms';

const { Header, Footer, Content } = Layout;

const AppRouter = (): JSX.Element => {
  const dispatch = useDispatch();
  const getUsers = ({ members, observers, master }: IChatUsers): void => {
    console.log({ members, observers, master });
    dispatch(chatParams({ members, observers, master }));
  };
  const history = useHistory();
  useEffect(() => {
    socket.on('MASTER_JOINED', ({ master }) => {
      console.log({ master });
    });
    socket.on('MEMBER_JOINED', getUsers);
    socket.on('MEMBER_LEAVED', getUsers);
    socket.on('GAME_DELETE_ISSUE', getUsers);
    socket.on('START_GAME', (): void => {
      history.push('/game-member');
    });
  }, []);
  return (
    <Layout style={{ minHeight: '100vh' }}>
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
};

export default AppRouter;
