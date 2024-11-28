import React, { useEffect, useState } from 'react';
import '../account.css';
import {
  Form, Input, Button, Col, Row,
} from 'antd';
import { useSelector } from 'react-redux';
import { UpdateUserAction, getUserAction } from '../../../User/UserActions';
import UserImageUpload from './UserImageUpload';

export default function Settings() {
  const [form] = Form.useForm();
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});
  const [originalFirstName, setOriginalFirstName] = useState('');
  const [originalLastName, setOriginalLastName] = useState('');

  const { currentUser } = useSelector((state) => state.loginReducer);

  const fetchUserDetail = async () => {
    const data = await getUserAction(currentUser.sub);
    form.setFieldsValue(data);
    setFirstName(data?.firstName);
    setLastName(data?.lastName);
    setOriginalFirstName(data?.firstName);
    setOriginalLastName(data?.lastName);
    setUserData(data);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const handleSubmit = async () => {
    try {
      form.validateFields().then(async (values) => {
        setLoading(true);
        const inputData = {
          id: currentUser.sub,
          firstName: values?.firstName || '',
          lastName: values?.lastName || '',
        };
        await UpdateUserAction(inputData);
        fetchUserDetail();
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.error('Error updating user information:', error);
    }
  };

  const handleUpdateUserProfile = async (fieldToUpdate, fieldValue) => {
    const inputData = {
      id: currentUser.sub,
      [fieldToUpdate]: fieldValue,
    };
    await UpdateUserAction(inputData);
    fetchUserDetail();
  };
  const hasChanges = () => {
    const formData = form.getFieldsValue();
    if (formData?.firstName !== originalFirstName
      || formData?.lastName !== originalLastName) {
      return true;
    }
    return false;
  };

  return (
    < >
      <div className="page-header">Profile</div>
      <div className="flex justify-center items-center portal-input">
        <Col sm={14} xs={24}>
          <div className="flex justify-center items-center text-center p-30">
            <UserImageUpload userData={userData} handleUpdateOrgImage={handleUpdateUserProfile} />
          </div>
          <div>
            <Form form={form} layout="vertical">
              <Form.Item label="Email" initialValue={currentUser?.email}>
                <Input
                  value={currentUser?.email}
                  disabled
                  style={{ height: '40px', fontSize: '16px' }}
                />
              </Form.Item>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your First Name!',
                  },
                ]}
              >
                <Input
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={loading}
                  style={{ height: '40px', fontSize: '16px' }}
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Last Name!',
                  },
                ]}
              >
                <Input
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={loading}
                  style={{ height: '40px', fontSize: '16px' }}
                />
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col sm={4} sx={12}>
                    <Button
                      type="primary"
                      size="medium"
                      block
                      onClick={handleSubmit}
                      loading={loading}
                      disabled={loading || !hasChanges()}
                    >
                      <span style={{ fontSize: '16px' }}>Save</span>
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </Col>

      </div>
    </>
  );
}
