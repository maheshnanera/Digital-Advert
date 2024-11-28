import {
  Col, Input, Row, Select,
} from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMediaFilterType, setMediaSearchQuery } from '../../../store/slices/portalSlice';

function GallerySubHeader() {
  const { mediaSearchQuery, mediaFilterType } = useSelector((state) => state.portal);

  const dispatch = useDispatch();

  const options = [
    { value: 'all', label: 'All' },
    { value: 'video', label: 'Video' },
    { value: 'image', label: 'Image' },
  ];
  const handleFilterChange = (value) => {
    dispatch(setMediaFilterType(value));
  };

  return (
    <Row className="justify-between" gutter={[16, 16]}>
      <Col xs={24} sm={6}>
        <Input
          placeholder="Search"
          className="searchableInput"
          style={{ fontSize: '16px' }}
          value={mediaSearchQuery}
          onChange={(e) => dispatch(setMediaSearchQuery(e.target.value))}
          allowClear
        />
      </Col>
      <Col xs={24} sm={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Select
          defaultValue="all"
          className="searchableInput"
          showSearch
          style={{ width: '100%' }}
          value={mediaFilterType}
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

export default GallerySubHeader;
