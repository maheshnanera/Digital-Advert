/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Col, Form, Input, Modal, Radio, Row, message,
} from 'antd';
import { setOpenInviteMember, setOrganizationMembers } from '../../../store/slices/portalSlice';
import { emailPattern } from '../../../Utils/constants';
import { RESTPost } from '../../../Utils/RestApi';
import { getOrganizationByUserCustom, getOrganizationMembers } from '../../../User/UserActions';

const plainOptions = ['ADMIN', 'OPERATOR'];
function AddMemberModal() {
  const { openInviteMember, organization } = useSelector((state) => state?.portal);
  const { currentUser } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const [value1, setValue1] = useState('OPERATOR');
  const [email, setEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    dispatch(setOpenInviteMember(false));
  };

  const handleCancel = () => {
    dispatch(setOpenInviteMember(false));
  };

  const fetchOrgMembers = async () => {
    const data = await getOrganizationByUserCustom(currentUser.sub);
    // Add condition to set the role = Root to org
    const rootIndex = data?.items?.findIndex((item) => item.role === 'ROOT');
    const orgId = rootIndex !== -1
      ? data.items[rootIndex].organization.id : data.items[0].organization.id;
    const orgMember = await getOrganizationMembers(orgId);
    dispatch(setOrganizationMembers(orgMember.items));
  };

  const handleInviteMember = async () => {
    try {
      setLoading(true);
      const inputData = {
        organizationName: organization?.organizationName,
        organizationID: organization?.id,
        role: value1 || 'OPERATOR',
        email,
      };

      await RESTPost('/inviteUser', inputData);
      setLoading(false);
      dispatch(setOpenInviteMember(false));
      fetchOrgMembers();
      message.success('Employee Added Successfully.');
    } catch (err) {
      setLoading(false);
      dispatch(setOpenInviteMember(false));
      message.error('Something went wrong!');
      console.log(err);
    }
  };

  const onChangeValue = ({ target: { value } }) => {
    setValue1(value);
  };

  return (

    <Modal
      title="Invite New Member"
      open={openInviteMember}
      onOk={handleInviteMember}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        labelCol={{ xs: 24 }}
        requiredMark={false}
        layout="vertical"
        name="normal_reset"
        className="reset-form"
        onFinish={handleOk}
      >
        <Form.Item
          label={(
            <small>
              <strong
                style={{
                  fontSize: '16px',
                }}
              >
                Email
              </strong>
            </small>
          )}
          labelCol={{ span: 24 }}
          name="email"
          rules={[
            { required: true, message: 'Please input email!' },
            {
              pattern: emailPattern,
              message: 'Please provide valid mail!',
            },
          ]}
        >
          <Input
            style={{
              height: '35px',
              fontSize: '16px',
            }}
            id="email"
            key="email"
            placeholder="Enter Member Email "
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={(
            <small>
              <strong style={{ fontSize: '16px' }}>User Role</strong>
            </small>
          )}
          labelCol={{ span: 24 }}
          name="userRole"
          rules={[{ required: true, message: 'Please select a user role!' }]}
        >
          <Radio.Group
            options={plainOptions}
            disabled={loading}
            onChange={onChangeValue}
            value={value1}
          />
        </Form.Item>
        <Form.Item>
          <Row justify="space-between">
            <Col className="mt-20 text-center" cas span={24}>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                tabIndex="5"
                onClick={handleInviteMember}
                disabled={loading}
              >
                Invite Member
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddMemberModal;
