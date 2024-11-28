import React from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Row } from 'antd';
import { setOpenAddCardModal, setOpenBillingModal } from '../../../../store/slices/portalSlice';

function BillingSettingHeader(props) {
  const { tabValue } = props;
  const dispatch = useDispatch();

  const handleOnClick = () => {
    if (tabValue === '2') {
      dispatch(setOpenBillingModal(true));
    } else {
      dispatch(setOpenAddCardModal(true));
    }
  };

  return (
    <Row className="justify-between">
      <div className="page-header">Billing</div>
      <Button
        type="primary"
        size="large"
        onClick={handleOnClick}
        loading={false}
      >
        <PlusCircleOutlined />
        <span style={{ fontSize: '16px' }}>
          {' '}
          {tabValue === '2' ? 'Set up Billing Info' : 'Add Credit Card'}
        </span>
      </Button>
    </Row>
  );
}

export default BillingSettingHeader;
