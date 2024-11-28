import React from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { setOpenNewCampaignModal } from '../../../store/slices/campaignSlice';

function DashboardHeader() {
  const dispatch = useDispatch();

  return (
    <Row className="justify-between">
      <div className="page-header">Campaigns</div>
      <Button
        type="primary"
        size="large"
        onClick={() => dispatch(setOpenNewCampaignModal(true))}
        loading={false}
      >
        <PlusCircleOutlined />
        <span style={{ fontSize: '16px' }}>New Campaign</span>
      </Button>
    </Row>
  );
}

export default DashboardHeader;
