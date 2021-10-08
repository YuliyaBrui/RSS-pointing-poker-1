import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router';

interface deleteProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DeleteGame = ({ setActive }: deleteProps): JSX.Element => {
  const history = useHistory();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p>
        The game was successfully deleted. You will automatically be taken to
        the home page.
      </p>
      <Button
        type="primary"
        htmlType="button"
        onClick={() => {
          setActive(false);
          history.push('/');
        }}
      >
        Ok
      </Button>
    </div>
  );
};
