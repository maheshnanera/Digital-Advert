import React from 'react';
import {
  Modal, Form, Input, Button,
} from 'antd';

function AddVenuePresetModal(props) {
  const {
    open, handleOnSubmit, onCancel, loading,
  } = props;
  const [form] = Form.useForm();

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
      title="Enter Venue Preset Name"
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
        <Form.Item
          name="presetName"
          label="Venue Preset Name"
          rules={[
            { required: true, message: 'Please enter venue name' },
          ]}
        >
          <Input placeholder="Enter venue name" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddVenuePresetModal;
