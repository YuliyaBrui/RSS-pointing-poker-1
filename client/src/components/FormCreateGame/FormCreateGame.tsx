import React, { useState } from 'react';
import { Form, Input, Button, Avatar, Upload, Col, Row } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IFormCreateGame } from '../../redux/types/forms';
import { saveParams } from '../../redux/actions/formCreateGame';
import { UploadAvatar } from '../UploadAvatar/UploadAvatar';

interface formProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormCreateGame = ({ setActive }: formProps): JSX.Element => {
  const [avatarURL, setAvatarURL] = useState<string | ArrayBuffer | null>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const reset = (): void => {
    setFirstName('');
    setLastName('');
    setJobPosition('');
  };
  const history = useHistory();
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    const value: IFormCreateGame = {
      name: firstName,
      lastName,
      jobPosition,
      avatarURL,
    };
    dispatch(saveParams(value));
    setActive(false);
    reset();
    form.resetFields();
    history.push('/setting');
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
              const newValue = e.target.value;
              setFirstName(newValue);
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
          <input
            accept="image/x-png,image/gif,image/jpeg,image/svg"
            type="file"
            id="imgInp"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setAvatarURL(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />

          {typeof avatarURL === 'string' ? (
            <Avatar src={avatarURL} />
          ) : (
            <Avatar size={64} icon={<UserOutlined />} />
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
