import React from 'react';
import Button from 'antd/lib/button/button';
import './StartCancelButtons.scss';

const StartCancelButtons = (): JSX.Element => {
  const asd = 123;
  return (
    <div className="main__start-or-cancel">
      <Button size="large" type="primary">
        Start Game
      </Button>
      <Button size="large" type="default">
        Cancel Game
      </Button>
    </div>
  );
};

export default StartCancelButtons;
