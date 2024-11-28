import React from 'react';
import {
  Modal, Form, Input, Upload, Button, message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function AddVenueCatalogItem(props) {
  const {
    isModalOpen,
    handleModalOk,
    handleModalCancel,
    fileList,
    isCreateLoading,
    setFileList,
  } = props;

  const [form] = Form.useForm();

  const handlePhotoUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleAddCatalog = () => {
    if (fileList?.length) {
      form.validateFields().then((values) => {
        handleModalOk(values);
      });
    } else {
      message.error('Please Select image');
    }
  };

  return (
    <Modal
      title="Add Venue Catalog Item "
      open={isModalOpen}
      onOk={handleAddCatalog}
      onCancel={handleModalCancel}
      footer={[
        <Button key="Cancel" onClick={handleModalCancel}>
          Cancel
        </Button>,
        <Button key="Save" type="primary" loading={isCreateLoading} disabled={isCreateLoading} onClick={handleAddCatalog}>
          Add Item
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="photo"
          label="Photo"
          valuePropName="fileList"
          getValueFromEvent={handlePhotoUpload}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            accept=".JPG, .PNG, .JPEG"
            onRemove={() => setFileList([])}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddVenueCatalogItem;