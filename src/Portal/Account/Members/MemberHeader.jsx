import React from 'react';
import { Button, Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setOpenInviteMember } from '../../../store/slices/portalSlice';

function MemberHeader() {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setOpenInviteMember(true));
  };
  return (
    <Row className="justify-between">
      <div className="page-header">Members</div>
      <Button
        type="primary"
        size="large"
        onClick={openModal}
        loading={false}
      >
        <PlusCircleOutlined />
        <span style={{ fontSize: '16px' }}>Invite Member</span>
      </Button>
    </Row>
  );
}

export default MemberHeader;
