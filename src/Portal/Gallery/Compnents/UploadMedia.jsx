/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Upload, Col, Row, Modal, Typography, Button, Input,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

function UploadMedia(props) {
  const {
    onCancel, onUpload, loading, fromCampaign, setRefreshData,
  } = props;
  const [fileList, setFileList] = useState([]);
  const [fileToUpload, setFileToUpload] = useState('');
  const [description, setDescription] = useState('');
  const { openAddMediaModal } = useSelector((state) => state.portal);

  const uploadProps = {
    name: 'file',
    accept: 'image/*,.mp4',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      const isValidType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp' || file.type === 'video/mp4';
      if (!isValidType) {
        message?.warning('You can only upload JPG/PNG images or MP4 videos.');
        return false;
      }
      const isValidSize = file.size / 1024 / 1024 < 100; // 100 MB limit
      if (!isValidSize) {
        message?.warning('File must be smaller than 100 MB.');
        return false;
      }
      return true;
    },
    // eslint-disable-next-line no-shadow
    onChange: ({ file, fileList }) => {
      setFileList(fileList);

      // Log the file object for inspection
      setFileToUpload(URL.createObjectURL(file.originFileObj));
    },
    onRemove: () => {
      setFileList([]);
      setFileToUpload('');
    },
  };

  const handleSaveMedia = async () => {
    await onUpload(fileList, description);
    if (fromCampaign) {
      setRefreshData(true);
    }

    setFileList([]);
    setFileToUpload('');
  };

  return (
    <Modal
      title={<Title level={3}>Upload Media</Title>}
      open={openAddMediaModal}
      onOk={handleSaveMedia}
      onCancel={onCancel}
      okText="Upload"
      width={800}
      footer={[
        <Button key="Cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="Save" type="primary" loading={loading} disabled={loading} onClick={handleSaveMedia}>
          Upload
        </Button>,
      ]}
      centered
    >
      {!fileToUpload && (
      <Upload {...uploadProps} className="flex justify-center cursor-pointer" accept=".JPG, .PNG, .JPEG, .WEBP, .MP4">
        <Row gutter={[20, 20]} style={{ gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
          <Col className="uploadFile" style={{ background: '#E9E9E9', border: '1px solid #C5C5C5' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '42px 20px', fontFamily: 'Inter',
            }}
            >
              <UploadOutlined />
              <span style={{
                fontSize: '13px', lineHeight: '16px', fontWeight: 500, marginTop: '15px',
              }}
              >
                Upload a Image/Video
              </span>
              <span style={{
                fontSize: '13px', lineHeight: '16px', fontWeight: 400, marginTop: '10px',
              }}
              >
                .jpg, .png, .webp/.mp4
              </span>
            </div>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Text>Click or drag file to upload</Text>
          <br />
          <Text type="secondary">JPG, PNG, or MP4 file, up to 100 MB</Text>
        </div>
      </Upload>
      )}
      {fileList.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {fileToUpload && (
            <div style={{ marginLeft: '24px' }}>
              <span level={5}>
                Title :
                {fileList[0].name}
              </span>
              <div className="flex justify-center" style={{ marginTop: '10px' }}>
                {fileList[0].type.startsWith('image') ? (
                  <img src={fileToUpload} alt="Preview" style={{ maxWidth: '400px', maxHeight: '300px' }} />
                ) : (

                  <video
                    controls
                    style={{ maxWidth: '400px', maxHeight: '300px' }}
                  >
                    <source src={fileToUpload} type="video/mp4" />
                  </video>
                )}
              </div>
              <Input
                style={{
                  height: '35px',
                  fontSize: '16px',
                  marginTop: '10px',
                }}
                value={description}
                id="description"
                key="description"
                placeholder="Description"
                disabled={loading}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

export default UploadMedia;
