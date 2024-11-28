import React, { useState } from 'react';
import {
  Modal, Input, Select, Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenNewCampaignModal } from '../../../store/slices/campaignSlice';

const { Option } = Select;

function NewCampaignModal(props) {
  const { handleOk, isLoading } = props;
  const { openNewCampaignModal } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();

  const [campaignName, setCampaignName] = useState('');
  const [targetCountry, setTargetCountry] = useState('UK');

  const handleCancel = () => {
    dispatch(setOpenNewCampaignModal(false));
  };
  const handleCreate = () => {
    const values = {
      CampaignName: campaignName,
      targetCountry,
    };
    handleOk(values);
  };

  return (
    <>
      <Modal
        title="New Campaign"
        open={openNewCampaignModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreate} loading={isLoading} disable={isLoading}>
            New Campaign
          </Button>,
        ]}
      >
        <span> Title</span>
        <Input
          placeholder="Enter campaign name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          style={{ height: '40px', fontSize: '16px' }}
        />

        <div className="mt-20">
          <span>Target Country</span>
          <Select
            style={{ width: '100%', marginTop: '5px' }}
            placeholder="Select target country"
            size="large"
            value={targetCountry}
            onChange={(value) => setTargetCountry(value)}
          >
            <Option value="usa">UK</Option>
          </Select>
        </div>
      </Modal>
    </>
  );
}

export default NewCampaignModal;
