import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Avatar, Switch, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';
import styles from './FormConnect.module.scss';
import { IFormGameValue } from '../../redux/types/forms';
import { socket } from '../../socket';
import { addCurrentUser } from '../../redux/actions/currentUser';
import { RootState } from '../../redux';

interface formProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormConnect = ({ setActive }: formProps): JSX.Element => {
  const [avatarURL, setAvatarURL] = useState<string | ArrayBuffer | null>('');
  const [isToggle, setToggle] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const reset = (): void => {
    setFirstName('');
    setLastName('');
    setJobPosition('');
    setAvatarURL('');
  };

  const history = useHistory();
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  const handleSubmit = (): void => {
    const value: IFormGameValue = {
      name: firstName,
      lastName,
      jobPosition,
      avatarURL,
      id: socket.id,
    };
    const joinState = {
      user: value,
      gameID,
    };
   
    if (isToggle) {
      const userStorage = {
        role: 'observer',
        name: firstName,
        lastName,
        jobPosition,
        avatarURL,
        id: socket.id,
      };
      socket.emit('GAME_JOIN_OBSERVER', joinState);
      sessionStorage.setItem('user', JSON.stringify(userStorage));
     
    } else {
      const userStorage = {
        role: 'member',
        name: firstName,
        lastName,
        jobPosition,
        avatarURL,
        id: socket.id,
      };
      socket.emit('GAME_JOIN_MEMBER', joinState);
      sessionStorage.setItem('user', JSON.stringify(userStorage));
     
    }
    sessionStorage.setItem('gameID', gameID);
   // dispatch(addCurrentUser(value));
    reset();
    form.resetFields();
    setActive(false);
    history.push(`/lobby/${gameID}`);
  };
  
  return (
    <div>
      <Row justify="space-between">
        <h2>Connect to lobby </h2>
        <label htmlFor="observer_switch">Connect as observer</label>
        <Switch
          className="observer_switch"
          checked={isToggle}
          onChange={() => setToggle((prev) => !prev)}
        />
      </Row>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        name="basic"
        labelCol={{ span: 18 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Your first name:"
          name="first-name"
          rules={[{ required: true, message: 'Enter your name' }]}
        >
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              setFirstName(value);
            }}
          />
           
        </Form.Item>

        <Form.Item
          label="Your last name(optional):"
          name="last-name"
          rules={[{ required: false }]}
        >
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;
              setLastName(newValue);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Your job position(optional):"
          name="job-position"
          rules={[{ required: false }]}
        >
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;
              setJobPosition(newValue);
            }}
          />
        </Form.Item>
        <Form.Item label="Image:" name="Image">
          <div className={styles.btn_container_avatar}>
            <label htmlFor="input_img-file">Choose file</label>
          </div>
          <input
            accept="image/x-png,image/gif,image/jpeg,image/svg"
            type="file"
            id="input_img-file"
            className={styles.hidden}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setAvatarURL(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />

          {typeof avatarURL !== 'string' || avatarURL === '' ? (
            <Avatar size={64} icon={<UserOutlined />} />
          ) : (
            <Avatar size={64} src={avatarURL} />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify="space-between">
            <Col>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Col>
            <Col>
              <Button
                type="default"
                htmlType="button"
                onClick={() => {
                  reset();
                  form.resetFields();
                  setActive(false);
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
