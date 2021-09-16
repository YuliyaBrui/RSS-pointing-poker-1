import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import Popconfirm from 'antd/lib/popconfirm';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { changeIssue, deleteIssue } from '../../redux/actions/issues';
import { IIssue } from '../../redux/types/issues';
import styles from './Issue.module.scss';

const Issue = ({ title, priority, id }: IIssue): JSX.Element => {
  const dispatch = useDispatch();
  const issues = useSelector((state: RootState) => state.issues);
  const [issueName, setIssueName] = useState(title);
  const [editIssueName, setEditIssueName] = useState(false);

  const changeTitle = (): void => {
    issues.map((issue: IIssue) => {
      const newIssue = issue;
      if (newIssue.id === id) {
        newIssue.title = issueName;
      }
      return newIssue;
    });
    dispatch(changeIssue(issues));
  };

  const removeIssue = (): void => {
    issues.map((issue: IIssue, index: number) => {
      const newIssue = issue;
      if (newIssue.id === id) {
        issues.splice(index, 1);
      }
      return newIssue;
    });
    dispatch(deleteIssue(issues));
  };

  return (
    <Card style={{ width: '250px', margin: '5px' }}>
      <div className={styles.main__content_wrapper}>
        <Input
          className={!editIssueName ? styles.main__input_disabled : ''}
          size="small"
          disabled={!editIssueName}
          value={issueName}
          onChange={(e) => {
            setIssueName(e.target.value);
            changeTitle();
          }}
          onPressEnter={() => {
            setEditIssueName(!editIssueName);
          }}
        />
        <div className={styles.main__button_wrapper}>
          <Button
            type="default"
            style={{ border: 'none', padding: '0px 5px 2px 0px' }}
            onClick={() => setEditIssueName(!editIssueName)}
          >
            <EditOutlined style={{ fontSize: '150%', margin: '1%' }} />
          </Button>
          <Popconfirm
            title="Delete issue?"
            okText="Yes"
            cancelText="No"
            onConfirm={removeIssue}
          >
            <DeleteOutlined
              style={{ fontSize: '150%', margin: '6%', color: 'red' }}
            />
          </Popconfirm>
        </div>
      </div>
      <p className={styles.main__priority}>{priority}</p>
    </Card>
  );
};

export default Issue;
