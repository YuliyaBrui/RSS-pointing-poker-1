import React, { useState } from 'react';
import { Form, Input, Button, Avatar, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IFormGameValue } from '../../redux/types/forms';
import styles from './FormCreateGame.module.scss';
import { socket } from '../../socket';
import { saveMasterParams } from '../../redux/actions/createSession';
import { addCurrentUser } from '../../redux/actions/currentUser';

interface formProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormCreateGame = ({ setActive }: formProps): JSX.Element => {
  const [avatarURL, setAvatarURL] = useState<string | ArrayBuffer | null>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
 
  const [form] = Form.useForm();
  const reset = (): void => {
    setFirstName('');
    setLastName('');
    setJobPosition('');
    setAvatarURL('');
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (): void => {
    const value: IFormGameValue = {
      name: firstName,
      lastName,
      jobPosition,
      avatarURL,
      id: socket.id,
    };
    const callback = (gameID: string): void => {
      const joinState = {
        master: value,
        gameID,
      };
      socket.emit('GAME_JOIN_MASTER', joinState);
      reset();
      form.resetFields();
      setActive(false);
      history.push(`/setting/${gameID}`);
    };
    dispatch(addCurrentUser(value));
    dispatch(saveMasterParams(value, callback));
  };
  
  return (
    <div>
      <Row>
        <h2>Create new game </h2>
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
            <label htmlFor="input_file">Choose file</label>
          </div>
          <input
            accept="image/x-png,image/gif,image/jpeg,image/svg"
            type="file"
            id="input_file"
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

        <Form.Item wrapperCol={{ span: 24 }} name="buttons">
          <Row justify="space-between">
            <Col>
              <Button type="primary" htmlType="submit" name="btn-submit">
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
