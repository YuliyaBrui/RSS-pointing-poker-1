import React, { useState } from 'react';
import Button from 'antd/lib/button/button';
import './StartCancelButtons.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { socket } from '../../../socket';
import { IssueValidation } from './IssueValidation';
import { Modal } from '../../modal/Modal';

export const StartCancelButtons = (): JSX.Element => {
  const [activeIssueValidation, setActiveIssueValidation] = useState(false);
  const store = useSelector((state: RootState) => state);
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  // const { gameID } = sessionStorage;
  const issues = useSelector((state: RootState) => state.chatReducer.issues);
  const history = useHistory();
  const StartGame = (): void => {
    if (issues.length) {
      socket.emit('START_GAME', gameID);
      socket.emit('ADD_GAME_SETTING', gameID, store.gameSetting);
      socket.emit('ADD_GAME_CARDS', gameID, store.gameCards);
      socket.emit('START_GAME', gameID, `/game-member/${gameID}`);
      history.push(`/game/${gameID}`);
    } else {
      setActiveIssueValidation(true);
    }
  };

  return (
    <div className="main__start-or-cancel">
      <Button size="large" type="primary" onClick={StartGame}>
        Start Game
      </Button>
      <Button size="large" type="default">
        Cancel Game
      </Button>
      <Modal active={activeIssueValidation}>
        <IssueValidation setActive={setActiveIssueValidation} />
      </Modal>
    </div>
  );
};
