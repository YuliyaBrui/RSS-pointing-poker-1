import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRoutes } from '../../route/route';
import { HeaderPoker } from '../Header/Header';
import { FooterPoker } from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { socket } from '../../socket';
import { chatParams } from '../../redux/actions/formConnectGame';
import { IChatUsers } from '../../redux/types/chat';

const { Header, Footer, Content } = Layout;

const AppRouter = (): JSX.Element => {
  const dispatch = useDispatch();
  const getUsers = ({ members, observers, master }: IChatUsers): void => {
    console.log({ members, observers, master });
    dispatch(chatParams({ members, observers, master }));
  };
  useEffect(() => {
    socket.on('MASTER_JOINED', ({ master }) => {
      console.log({ master });
    });
    socket.on('MEMBER_JOINED', getUsers);
    socket.on('MEMBER_LEAVED', getUsers);
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
