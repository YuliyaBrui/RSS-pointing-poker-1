import React from 'react';
import { Button } from 'antd';

interface formProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ErrorGameID = ({ setActive }: formProps): JSX.Element => (
  <div>
    <p>A room with this ID does not exist</p>
    <Button
      type="default"
      htmlType="button"
      onClick={() => {
        setActive(false);
      }}
    >
      Ok
    </Button>
  </div>
);
