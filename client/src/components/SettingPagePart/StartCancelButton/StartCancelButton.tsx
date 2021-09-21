import React from 'react';
import Button from 'antd/lib/button/button';
import './StartCancelButtons.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { socket } from '../../../socket';

const StartCancelButtons = (): JSX.Element => {
  const store = useSelector((state: RootState) => state);

  const history = useHistory();
  const StartGame = (): void => {
    socket.emit('START_GAME', '1111');
    socket.emit('ADD_GAME_SETTING', '1111', store.gameSetting);
    socket.emit('ADD_GAME_CARDS', '1111', store.gameCards);
    history.push('/game');
  };
  const MemberGame = (): void => {
    history.push('/game-member');
  };

  return (
    <div className="main__start-or-cancel">
      <Button size="large" type="primary" onClick={StartGame}>
        Start Game
      </Button>
      <Button size="large" type="default" onClick={MemberGame}>
        Cancel Game
      </Button>
    </div>
  );
};

export default StartCancelButtons;
