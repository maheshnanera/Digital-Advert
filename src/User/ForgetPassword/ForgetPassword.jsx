/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Input, Row,
} from 'antd';
import { resetPassword } from 'aws-amplify/auth';
import { COLORS, emailPattern } from '../../Utils/constants';
import backGround from '../../assets/Images/backGround.png';

function ForgetPassword({ history }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (values) => {
    setLoading(true);
    setError('');
    try {
      const output = await resetPassword({ username: values.email });
      console.log('output', output);
      setLoading(false);
      history.push({
        pathname: '/reset-password',
        state: { userName: values.email },
      });
    } catch (error) {
      console.log('error resetting password:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle">
      <Col xs={0} md={0} lg={8}>
        <img
          src={backGround}
          alt="backGround"
          style={{ height: '100vh', minHeight: 580, objectFit: 'cover' }}
        />
      </Col>
      <Col xs={24} md={24} lg={16} style={{ transform: 'scale(0.88)' }}>
        <Row
          justify="center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: '100vh',
            minHeight: 580,
          }}
        >
          <Card
            className="card-container"
            style={{ border: 'none', width: '437px' }}
          >
            {error !== '' && (
            <Alert
              style={{ marginBottom: '10px' }}
              type="error"
              showIcon={false}
              message={error}
              banner
            />
            )}
            <Form
              labelCol={{ xs: 24 }}
              requiredMark={false}
              layout="vertical"
              name="normal_reset"
              className="reset-form"
              onFinish={handleResetPassword}
            >
              <Form.Item
                label={(
                  <small>
                    {' '}
                    <strong
                      style={{
                        fontSize: '18px',
                      }}
                    >
                      Email
                    </strong>
                  </small>
       )}
                labelCol={{ span: 24 }}
                name="email"
                rules={[
                  { required: true, message: 'Please input your Email!' },
                  {
                    pattern: emailPattern,
                    message: 'Please provide valid Email!',
                  },
                ]}
              >
                <Input
                  style={{
                    height: '44px',
                    fontSize: '18px',
                  }}
                  id="email"
                  key="email"
                  name="email"
                  placeholder="Your email id"
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between">
                  <Col span={8}>
                    <Button
                      type="link"
                      size="large"
                      block
                      onClick={() => history.push('/signin')}
                      disabled={loading}
                      tabIndex={6}
                      style={{ textAlign: 'left' }}
                    >
                      <span style={{ color: COLORS.primaryText, fontWeight: '600' }}>
                        Sign In
                      </span>
                    </Button>
                  </Col>
                  <Col span={10}>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      block
                      loading={loading}
                      tabIndex={5}
                    >
                      Send Code
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>

          <div>
            <p
              style={{
                color: '#646C79',
                fontSize: '16px',
                textAlign: 'center',
                fontWeight: '500',
                userSelect: 'none',
                marginBottom: '0px',
              }}
            >
              Version 0.1.0
            </p>
            <p
              style={{
                fontSize: '16px',
                color: '#646C79',
                textAlign: 'center',
              }}
            >
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              Ida Portal copyright all rights
              reserved.
            </p>
          </div>
        </Row>
      </Col>
    </Row>
  );
}

export default ForgetPassword;
