import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

function getBase64(img: Blob, callback: { (arg: any): void }): void {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    callback(reader.result);
  });
  reader.readAsDataURL(img);
}

function beforeUpload(file: RcFile): boolean {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
}
export const UploadAvatar = (): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info: UploadChangeParam): void => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as Blob, (imageUrl: string) => {
        setLoading(false);
        setImageURL(imageUrl);
        console.log(imageURL);
      });
    }
  };
  const onPreview = async (file: UploadFile<any>): Promise<any> => {
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as Blob);
      reader.onload = () => resolve(reader.result);
    });
    console.log(src);
  };
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      onPreview={onPreview}
    >
      {imageURL !== '' ? (
        <img src={imageURL} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
