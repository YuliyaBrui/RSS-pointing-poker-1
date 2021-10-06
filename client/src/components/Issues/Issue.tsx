import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib/icons';
import Button from 'antd/lib/button/button';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input/Input';
import Popconfirm from 'antd/lib/popconfirm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux';
import { getUsersParams } from '../../redux/actions/createSession';
import { gameIssues } from '../../redux/actions/chat';
import { IIssue } from '../../redux/types/issues';
import { socket } from '../../socket';
import styles from './Issue.module.scss';

const Issue = ({ title, priority, link, id }: IIssue): JSX.Element => {
  const dispatch = useDispatch();

  const location = useLocation();

  /* const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
*/
  const { gameID } = sessionStorage;
  useEffect(() => {
    dispatch(getUsersParams(gameID));
  }, []);
  const issues = useSelector((state: RootState) => state.chatReducer.issues);
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
    const changeIssue = {
      gameID,
      id,
      title: issueName,
    };
    socket.emit('GAME_CHANGE_ISSUE', changeIssue);
    dispatch(gameIssues(issues));
  };

  const removeIssue = (): void => {
    issues.map((issue: IIssue, index: number) => {
      const newIssue = issue;
      if (newIssue.id === id) {
        issues.splice(index, 1);

        const issueDelete = {
          gameID,
          id,
        };
        socket.emit('GAME_DELETE_ISSUE', issueDelete);
      }
      return newIssue;
    });
    dispatch(gameIssues(issues));
  };

  return (
    <Card style={{ width: '260px', height: '90px', margin: '5px' }}>
      <div className={styles.main__content_wrapper}>
        <Input
          className={!editIssueName ? styles.main__input_disabled : ''}
          size="small"
          disabled={!editIssueName}
          value={issueName}
          onChange={(e) => {
            setIssueName(e.target.value);
          }}
          onPressEnter={() => {
            setEditIssueName(!editIssueName);
            changeTitle();
          }}
        />
        {location.pathname === `/setting/${gameID}` && (
          <div className={styles.main__button_wrapper}>
            <Button
              type="default"
              style={{ border: 'none', padding: '0px 5px 2px 0px' }}
              onClick={() => {
                setEditIssueName(!editIssueName);
                changeTitle();
              }}
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
        )}
      </div>
      <p className={styles.main__priority}>
        priority:
        {priority}
      </p>
    </Card>
  );
};

export default Issue;
