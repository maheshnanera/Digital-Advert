import React from 'react';
import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Row, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { setOpenAddMediaModal } from '../store/slices/portalSlice';

function GlobalHeaderForSaveAndExit(props) {
  const {
    headerTitle, handelSaveExit, stepNumber, subHeaderTitle, buttonTitle = 'Save & Exit', shouldNotContinue = false,
  } = props;

  const dispatch = useDispatch();

  return (
    <Row className="justify-between">
      <div className="flex gap-10">
        <div className="page-header flex items-center" style={{ color: 'gray' }}>
          {stepNumber}
          /5
        </div>
        <div>
          <div className="page-header" style={{ lineHeight: '18px' }}>
            {headerTitle}
          </div>
          <div>
            {subHeaderTitle}
          </div>
        </div>
      </div>
      <div className="flex flex-row" style={{ gap: '10px' }}>
        { headerTitle === 'Gallery' && (
        <Button
          type="primary"
          size="large"
          onClick={() => dispatch(setOpenAddMediaModal(true))}
          loading={false}
        >
          <PlusCircleOutlined />
          <span style={{ fontSize: '16px' }}>New Media</span>
        </Button>
        )}
        <Tooltip title={shouldNotContinue || ''}>
          <Button
            type="primary"
            size="large"
            onClick={handelSaveExit}
            loading={false}
            disabled={shouldNotContinue}
          >
            <CloseOutlined />
            <span style={{ fontSize: '16px' }}>{buttonTitle}</span>
          </Button>
        </Tooltip>
      </div>
    </Row>
  );
}

export default GlobalHeaderForSaveAndExit;
