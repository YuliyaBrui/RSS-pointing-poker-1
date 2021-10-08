import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { privateRoutes } from '../../route/route';
import { HeaderPoker } from '../Header/Header';
import { FooterPoker } from '../Footer/Footer';
import { socket } from '../../socket';
import { chatParams, gameIssues, setGameCards, setSettingGame } from '../../redux/actions/chat';
import { IChatUsers } from '../../redux/types/chat';
import { kickForm } from '../../redux/actions/kickForm';
import { IIssue } from '../../redux/types/issues';
import { IGameSetting } from '../../redux/types/gameSetting';
import { IGameCard } from '../../redux/types/gameCard';

const { Header, Footer, Content } = Layout;

const AppRouter = (): JSX.Element => {
  const dispatch = useDispatch();
  const getUsers = ({ members, observers, master }: IChatUsers): void => {
    dispatch(chatParams({ members, observers, master }));
  };
 
  const getIssues = (issues: IIssue[]): void => {
    dispatch(gameIssues(issues));
  };
  const formData = (kickData: any): void => {
    dispatch(kickForm(kickData));
  };
  const getSetting = (setting: IGameSetting): void => {
    dispatch(setSettingGame(setting));
  };
  const getGameCards = (gameCards: IGameCard[]): void => {
    dispatch(setGameCards(gameCards));
  };
  const history = useHistory();
  useEffect(() => {
    socket.on('MASTER_JOINED', ({ master }) => {});
    socket.on('MEMBER_JOINED', getUsers);
    socket.on('MASTER_LEAVED', (gameID): void => {
      if (gameID === sessionStorage.gameID) {
        history.push('/');
      }
    });
   
    socket.on('MEMBER_LEAVED', getUsers);
    socket.on('GAME_ADD_ISSUE', getIssues);
    socket.on('GAME_DELETE_ISSUE', getIssues);
    socket.on('GAME_CHANGE_ISSUE', getIssues);
    socket.on('GAME_SORT_ISSUES', getIssues);
    socket.on('ADDED_GAME_SETTING', getSetting);
    socket.on('ADDED_GAME_CARDS', getGameCards);
    socket.on('KICKED_MEMBER', getUsers);
    socket.on('USER_EXIT', getUsers);
    socket.on('FINISH_VOITING', formData);
    socket.on('STOP_JOIN', (id): void => {
      if (socket.id === id) {
        history.push('/');
      }
    });
    socket.on('START_GAME', (address: string): void => {
      history.push(address);
    });
    socket.on('GAME_RESULTS', (address: string): void => {
      history.push(address);
    });
    socket.on('GAME_DELETED', (address: string): void => {
      history.push(address);
    });
  }, []);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#66999B' }}>
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
      <FooterPoker />
    </Layout>
  );
};

export default AppRouter;
