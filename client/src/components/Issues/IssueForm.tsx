import React, { useState } from 'react';
import shortid from 'shortid';
import Button from 'antd/lib/button/button';
import { Form, Input } from 'antd';
import Select from 'antd/lib/select';
import { useDispatch } from 'react-redux';
import styles from './Issue.module.scss';
import { addIssue } from '../../redux/actions/issues';

type IIsueform = {
  formVisible: boolean;
  setFormVisible: (a: boolean) => void;
};

const IssueForm = ({ formVisible, setFormVisible }: IIsueform): JSX.Element => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [priority, setPriority] = useState('');

  const dispatch = useDispatch();

  const id = shortid();

  const [form] = Form.useForm();

  const resetForm = (): void => {
    form.resetFields();
    setFormVisible(false);
  };

  const handleSubmit = (): void => {
    dispatch(
      addIssue({
        title,
        link,
        priority,
        id,
      }),
    );
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
                { label: 'height', value: 'height' },
              ]}
              onSelect={(value) => setPriority(`${value}`)}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
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
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default IssueForm;
