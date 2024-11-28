import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Avatar } from 'antd';
import { GetFileFromS3, uploadFileToS3 } from '../ReUsableFunctions/UploadFile';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

const UploadImage = (props) => {
  const { handleUpdateOrgImage } = props
  const { organization } = useSelector((state) => state.portal);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    const getImage = async () => {
      if (organization.photo) {
        const link = await GetFileFromS3(organization.photo);
        setImageUrl(link.url);
      }
    };
    if (imageUrl === null || imageUrl === undefined) {
      getImage();
    }
  }, []);



  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  const uploadProps = {
    onChange({ file, fileList }) {
      if (file.status === 'uploading') {
        setLoading(true);
      }
      if (file.status === 'done') {
        setLoading(false);
      }
    },

    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onRemove,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      uploadFileToS3(file)
        .then(async (res) => {
          const link = await GetFileFromS3(res.key);
          handleUpdateOrgImage("photo", res.key)
          setImageUrl(link.url);
          onSuccess();
        })
        .catch((err) => {
          console.log('ERROR', err);
          onError();
        });
    },
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
        cursor: "pointer"
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <Avatar size={60}>M</Avatar>}
    </button>
  );
  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        {...uploadProps}
        accept=".JPG, .PNG, .JPEG"
      >
        {console.log("imageUrl11", imageUrl)}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
export default UploadImage;
