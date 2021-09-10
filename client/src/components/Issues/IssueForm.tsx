import React, { FC } from 'react';
import Button from 'antd/lib/button/button';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input/Input';
import Select from 'antd/lib/select';
import styles from './Issue.module.scss';

const { Option } = Select;

type IIsueform = {
  formVisible: boolean;
  setFormVisible: (a: boolean) => void;
};

const IssueForm = ({ formVisible, setFormVisible }: IIsueform): JSX.Element => (
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
      <Form layout="horizontal">
        <FormItem
          rules={[{ required: true }]}
          label="Title"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Input />
        </FormItem>
        <FormItem
          rules={[{ required: true }]}
          label="Link"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Input />
        </FormItem>
        <FormItem
          name="priority"
          label="Priority"
          rules={[{ required: true }]}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Select placeholder="Select priority" allowClear>
            <Option value="low">low</Option>
            <Option value="middle">middle</Option>
            <Option value="height">height</Option>
          </Select>
        </FormItem>
        <FormItem wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" size="large">
            Submit
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
);

export default IssueForm;