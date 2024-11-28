import React, { useEffect, useState } from 'react';
import {
  Modal, Form, Select, Input, Button,
} from 'antd';

const countryOptions = ['UK'];

function AddScreenGeoModal(props) {
  const {
    open, handleOnSubmit, onCancel, loading, recordData, venueCatalogData,
  } = props;
  const [form] = Form.useForm();
  const [country, setCountry] = useState('UK');

  useEffect(() => {
    if (Object.keys(recordData)?.length > 0) {
      const updatedData = {
        longitude: recordData.lng,
        latitude: recordData.lat,
        country: recordData.targetCountry,
        venueTypes: recordData.targetVenues,
        height: recordData?.height,
        width: recordData?.width,
        maxCapacity: recordData?.maxCapacity,
      };
      form.setFieldsValue(updatedData);
    }
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleOnSubmit(values);
        form.resetFields();
      })
      .catch((err) => console.log('Validation Error:', err));
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Enter Device Details"
      okText="Save"
      cancelText="Cancel"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="Cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="Save" type="primary" loading={loading} disabled={loading} onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Country" name="country" initialValue="UK" rules={[{ required: true, message: 'Please select the country' }]}>
          <Select
            value={country}
            onChange={(value) => setCountry(value)}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children
              .toLowerCase().includes(input.toLowerCase())}
          >
            {countryOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="latitude"
          label="Latitude"
          rules={[
            { required: true, message: 'Please enter the latitude' },
            { pattern: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, message: 'Please enter a valid latitude' },
          ]}
        >
          <Input placeholder="Enter latitude" />
        </Form.Item>

        <Form.Item
          name="longitude"
          label="Longitude"
          rules={[
            { required: true, message: 'Please enter the latitude' },
            { pattern: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, message: 'Please enter a valid latitude' },
          ]}
        >
          <Input placeholder="Enter longitude" />
        </Form.Item>
        <Form.Item
          name="height"
          label="Device Height (px)"
          rules={[
            { required: true, message: 'Please enter device height' },
            { pattern: /^\d+$/, message: 'Please enter a valid height in pixels' },
          ]}
        >
          <Input placeholder="Enter Height(px)" />
        </Form.Item>
        <Form.Item
          name="width"
          label="Device width (px)"
          rules={[
            { required: true, message: 'Please enter device width' },
            { pattern: /^\d+$/, message: 'Please enter a valid width in pixels' },
          ]}
        >
          <Input placeholder="Enter Widht(px)" />
        </Form.Item>
        <Form.Item
          name="maxCapacity"
          label="Max Capacity"
          rules={[
            { required: true, message: 'Please eenter max capacity of device' },
            { pattern: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, message: 'Please enter a valid latitude' },
          ]}
        >
          <Input placeholder="Enter device capcity" />
        </Form.Item>
        <Form.Item
          name="venueTypes"
          label="Venue Types"
        >
          <Select
            mode="multiple"
            showArrow
            style={{ width: '100%', height: '40px' }}
            size="large"
            placeholder="Please select venue type"
            allowClear
            optionFilterProp="children"
            disabled={false}
          >
            {
              venueCatalogData?.map((catalogItem) => (
                catalogItem?.venueCatalogItems?.items?.length > 0
                && (
                <Select.OptGroup label={(
                  <span>
                    <strong>{catalogItem.venuePrsetName}</strong>
                  </span>
)}
                >
                  {
                    catalogItem?.venueCatalogItems?.items?.map((item) => (
                      <Select.Option className="custom-option" value={item?.id}>{item?.venueItemName}</Select.Option>
                    ))
}
                </Select.OptGroup>
                )
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddScreenGeoModal;
