import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Input, Row, Select,
} from 'antd';
import { setOrgMemberFilterType, setOrgMemberSearchQuery } from '../../../store/slices/portalSlice';

function MemberSubHeader() {
  const dispatch = useDispatch();
  const { orgMemberSearchQuery, orgMemberFilterType } = useSelector((state) => state.portal);
  const options = [
    { value: 'name', label: 'Name' },
    { value: 'status', label: 'Status' },
    { value: 'email', label: 'Email' },
    { value: 'createdAt', label: 'Created at' },
  ];

  const handleFilterChange = (value) => {
    dispatch(setOrgMemberFilterType(value));
  };
  return (
    <Row className="justify-between mt-20" gutter={[16, 16]}>
      <Col xs={24} sm={6}>
        <Input
          placeholder="Search"
          className="searchableInput"
          style={{ fontSize: '16px' }}
          value={orgMemberSearchQuery}
          onChange={(e) => dispatch(setOrgMemberSearchQuery(e.target.value))}
          allowClear
        />
      </Col>
      <Col xs={24} sm={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Select
          defaultValue="name"
          className="searchableInput"
          showSearch
          style={{ width: '100%' }}
          value={orgMemberFilterType}
          onChange={handleFilterChange}
        >
          {options?.length > 0
            && options.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
              >
                {option?.label}
              </Select.Option>
            ))}
        </Select>
      </Col>
    </Row>
  );
}

export default MemberSubHeader;
