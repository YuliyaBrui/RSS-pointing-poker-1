import React, { useState } from 'react';
import shortid from 'shortid';
import Button from 'antd/lib/button/button';
import { Form, Input } from 'antd';
import Select from 'antd/lib/select';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Issue.module.scss';

import { socket } from '../../socket';
import { addIssue } from '../../redux/actions/chat';
import { RootState } from '../../redux';

type IIsueform = {
  formVisible: boolean;
  setFormVisible: (a: boolean) => void;
};

const IssueForm = ({ formVisible, setFormVisible }: IIsueform): JSX.Element => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [priority, setPriority] = useState('');

  const dispatch = useDispatch();
  const gameID = useSelector(
    (state: RootState) => state.formCreateReducer.IDGame,
  );
  const id = shortid();

  const [form] = Form.useForm();

  const resetForm = (): void => {
    form.resetFields();
    setFormVisible(false);
  };

  const handleSubmit = (): void => {
    const newIssue = {
      title,
      link,
      priority,
      id,
      gameID,
    };
    dispatch(
      addIssue({
        title,
        link,
        priority,
        id,
      }),
    );
    socket.emit('GAME_NEW_ISSUE', newIssue);
    resetForm();
  };

  return (
    <div
      className={
        formVisible
          ? `${styles.issue_form} ${styles.issue_form__active}`
          : `${styles.issue_form}`
      }
      onClick={() => setFormVisible(false)}
    >
      <div
        className={styles.issue_form__content}
        onClick={(e) => e.stopPropagation()}
      >
        <Form
          layout="horizontal"
          wrapperCol={{ span: 3, offset: 3 }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            rules={[{ required: true }]}
            name="Title"
            label="Title"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
          >
            <Input onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="Link"
            label="Link"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
          >
            <Input onChange={(e) => setLink(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="Priority"
            label="Priority"
            rules={[{ required: true }]}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
          >
            <Select
              placeholder="Select priority"
              allowClear
              options={[
                { label: 'low', value: 'low' },
                { label: 'middle', value: 'middle' },
                { label: 'high', value: 'high' },
              ]}
              onSelect={(value) => setPriority(`${value}`)}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
            <div style={{ display: 'flex' }}>
              <Button type="primary" size="large" htmlType="submit">
                Submit
              </Button>
              <Button
                type="default"
                size="large"
                style={{ marginLeft: '10px' }}
                htmlType="button"
                onClick={resetForm}
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default IssueForm;
