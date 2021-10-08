import React from 'react';
import { Button } from 'antd';

interface issueProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const IssueValidation = ({ setActive }: issueProps): JSX.Element => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <p style={{ width: 'fit-content' }}>You don&apos;t have issue for game</p>
    <Button
      type="primary"
      htmlType="button"
      onClick={() => {
        setActive(false);
      }}
    >
      Ok
    </Button>
  </div>
);
