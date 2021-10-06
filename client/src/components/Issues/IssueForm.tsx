import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import shortid from 'shortid';
import Button from 'antd/lib/button/button';
import { Form, Input, Upload } from 'antd';
import Select from 'antd/lib/select';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons/lib/icons';
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
  // const { gameID } = sessionStorage;
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

  const readExcel = (file: any): void => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (!e.target) return;
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d: any) => {
      d.forEach((el: any) => {
        dispatch(addIssue({ ...el }));
        socket.emit('GAME_NEW_ISSUE', { gameID, ...el });
      });
      resetForm();
    });
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
            wrapperCol={{ span: 20 }}
          >
            <Input
              style={{ maxWidth: '100%' }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="Link"
            label="Link"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input onChange={(e) => setLink(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="Priority"
            label="Priority"
            rules={[{ required: true }]}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
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
          <Form.Item name="summit" wrapperCol={{ span: 14, offset: 4 }}>
            <div style={{ display: 'flex' }}>
              <Button type="primary" size="large" htmlType="submit">
                Submit
              </Button>
              <Button
                type="default"
                size="large"
                style={{ marginLeft: '10px', zIndex: 5 }}
                htmlType="button"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                style={{ marginLeft: '10px' }}
                size="large"
              >
                Download
                <input
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: '-100px',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                  type="file"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const file = e.target.files[0];
                    readExcel(file);
                  }}
                />
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default IssueForm;
