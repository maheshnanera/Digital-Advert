import React from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { setOpenAddMediaModal } from '../../../store/slices/portalSlice';

function GalleryHeader() {
  const dispatch = useDispatch();

  return (
    <Row className="justify-between">
      <div className="page-header">Gallery</div>
      <Button
        type="primary"
        size="large"
        onClick={() => dispatch(setOpenAddMediaModal(true))}
        loading={false}
      >
        <PlusCircleOutlined />
        <span style={{ fontSize: '16px' }}>New Media</span>
      </Button>
    </Row>
  );
}

export default GalleryHeader;
