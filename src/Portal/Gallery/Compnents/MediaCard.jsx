/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Card, Modal, Button, Skeleton, Popconfirm,
} from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

function MediaCard(props) {
  const { mediaFile, handleDelete } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        className="mediaCard"
        onClick={() => setIsModalVisible(true)}
        cover={
          mediaFile?.contentType === 'Image' ? (
            <img alt={mediaFile?.mediaName} src={mediaFile?.mediaUrl} className="media-content" />
          ) : mediaFile?.contentType === 'Video' ? (
            <video width="100%" className="media-content" muted>
              <source
                src={mediaFile?.mediaUrl}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )
            : <div className="media-content image-skeleton"><Skeleton.Image height="100%" style={{ height: '100%', width: '100%' }} active /></div>
        }
        actions={[
          <div
            className="flex justify-between"
            style={{ paddingLeft: '5px', paddingRight: '5px' }}
          >
            <Button type="primary" icon={<EyeOutlined />} onClick={showModal}>
              {mediaFile?.contentType}
            </Button>
            <Popconfirm
              title="Are you sure to Delete this record?"
              onConfirm={(e) => handleDelete(e, mediaFile.id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined onClick={(e) => { e.stopPropagation(); }} />
            </Popconfirm>
          </div>,
        ]}
      >
        <Card.Meta title={mediaFile?.mediaName} style={{ fontSize: '12px', fontWeight: '600' }} />
        <Card.Meta title={mediaFile?.description} style={{ fontSize: '10px', fontWeight: '400', marginTop: '4px' }} />
      </Card>

      <Modal
        title={mediaFile?.title}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnClose // To unmount the modal content when it is closed
      >
        <div>
          <span level={5}>{mediaFile?.mediaName}</span>
          <div style={{ fontFamily: 'Inter', fontSize: '12px' }}>
            {' '}
            Description :
            {mediaFile?.description}
          </div>
          <div className="mt-10">
            {mediaFile?.contentType === 'Image' ? (
              <img alt={mediaFile?.mediaName} src={mediaFile?.mediaUrl} style={{ width: '100%' }} />
            ) : (
              <video
                width="100%"
                controls
                style={{
                  height: '373px',
                  background: '#222731',
                  borderRadius: '8px',
                }}
              >
                <source src={mediaFile?.mediaUrl} type="video/mp4" muted />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default MediaCard;
