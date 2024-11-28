import {
  Col, Input, Row,
} from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCampaignSearchQuery } from '../../../store/slices/campaignSlice';

function DashboardSubHeader() {
  const { campaignSearchQuery } = useSelector((state) => state.campaign);

  const dispatch = useDispatch();

  return (
    <Row className="justify-between" gutter={[16, 16]}>
      <Col xs={24} sm={6}>
        <Input
          placeholder="Search"
          className="searchableInput"
          style={{ fontSize: '16px' }}
          value={campaignSearchQuery}
          onChange={(e) => dispatch(setCampaignSearchQuery(e.target.value))}
          allowClear
        />
      </Col>
      {/* <Col xs={24} sm={4} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Select
          defaultValue="title"
          className='searchableInput'
          showSearch
          style={{ width: "100%" }}
          onChange={handleSortChange}
        >
          {options?.length > 0 &&
            options.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
              >
                {option?.label}
              </Select.Option>
            ))}
        </Select>
      </Col> */}
    </Row>
  );
}

export default DashboardSubHeader;
