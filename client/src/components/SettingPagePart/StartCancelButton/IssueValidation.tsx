import React from 'react';
import { Button } from 'antd';

interface issueProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const IssueValidation = ({ setActive }: issueProps): JSX.Element => (
  <div>
    <p>You don&apos;t have issue for game</p>
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
