import {
  Form,
  Input,
  Button,
  Checkbox,
  Avatar,
  Upload,
  Switch,
  Col,
  Row,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Forms.module.scss";
import { ChangeEvent, ImgHTMLAttributes, useState } from "react";
import { url } from "inspector";

interface formProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormConnect = ({ setActive }: formProps) => {
  const [toggle, setToggle] = useState(false);
  const [isAvatar, setAvatar] = useState(false);
  const [avatarURL, setAvatarURL] = useState("");
  /* const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const target= event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      console.log(file)
      
    };
    const onPreview = async (file ) => {
      
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      
      }
      setAvatarURL(src)
      console.log(src)
    }*/
  const onFinish = (values: {}) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: {}) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
     <Row justify="space-between">
        <h2>Connect to lobby </h2>
        <label >
          Connect as observer
          <Switch
            checked={toggle}
            onChange={() => setToggle((prev) => !prev)}
          />
        </label>
      </Row>
      <Form
        layout="vertical"
        name="basic"
        labelCol={{ span: 18 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Your first name:"
          name="first-name"
          rules={[{ required: true, message: "Enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Your last name(optional):"
          name="last-name"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Your job position(optional):"
          name="job-position"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image:" name="Image">
          <Upload
            maxCount={1}
            accept="image/x-png,image/gif,image/jpeg,image/svg"
          >
            <Button icon={<UploadOutlined />}>Choose file</Button>
          </Upload>
          {isAvatar ? (
            <Avatar src={avatarURL} />
          ) : (
            <Avatar size={64} icon={<UserOutlined />} />
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
