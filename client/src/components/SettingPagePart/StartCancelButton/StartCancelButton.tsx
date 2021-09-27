import React from 'react';
import Button from 'antd/lib/button/button';
import './StartCancelButtons.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { socket } from '../../../socket';

const StartCancelButtons = (): JSX.Element => {
  const store = useSelector((state: RootState) => state);
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  const history = useHistory();
  const StartGame = (): void => {
    socket.emit('START_GAME', gameID);
    socket.emit('ADD_GAME_SETTING', gameID, store.gameSetting);
    socket.emit('ADD_GAME_CARDS', gameID, store.gameCards);
    socket.emit('START_GAME', gameID, `/game-member/${gameID}`);
    history.push(`/game/${gameID}`);
  };

  return (
    <div className="main__start-or-cancel">
      <Button size="large" type="primary" onClick={StartGame}>
        Start Game
      </Button>
      <Button size="large" type="default">
        Cancel Game
      </Button>
    </div>
  );
};

export default StartCancelButtons;
