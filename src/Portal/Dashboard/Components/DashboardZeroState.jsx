/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Row } from 'antd';
import { setOpenNewCampaignModal } from '../../../store/slices/campaignSlice';
import EmptyStateImage from '../../../assets/Images/EmptyState.jpg';

function DashboardZeroState() {
  const dispatch = useDispatch();
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Row className="justify-center items-center h-full" style={{ paddingTop: '10px' }}>
      <div className="flex flexColumn" style={{ textAlign: 'center', gap: '20px' }}>
        <img
          src={EmptyStateImage}
          alt="backGround"
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <div className="flex flexColumn" style={{ gap: '5px' }}>
          <div style={{ fontSize: '18px', fontWeight: 500, opacity: 0.6 }}>
            Start your first campaign
          </div>
          <div>
            You have no campaigns yet.
            Start with your first one right away!
          </div>
        </div>
        <div>
          <Button
            type={isMouseOver ? 'primary' : 'link'}
            size="large"
            onClick={() => dispatch(setOpenNewCampaignModal(true))}
            disabled={false}
            tabIndex={4}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          >
            <span
              style={{ color: isMouseOver ? 'white' : '#F26539', fontWeight: '600', fontSize: '18px' }}
            >
              New Campaign
            </span>
          </Button>
        </div>
      </div>
    </Row>
  );
}

export default DashboardZeroState;
