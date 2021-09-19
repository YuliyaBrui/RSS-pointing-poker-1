import React from 'react';
import Button from 'antd/lib/button/button';
import './StartCancelButtons.scss';
import { useHistory } from 'react-router-dom';

const StartCancelButtons = (): JSX.Element => {
  const asd = 123;
  const history = useHistory();
  const StartGame = (): void => {
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
