/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Input, Row,
} from 'antd';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import { useHistory } from 'react-router';
import { COLORS } from '../../Utils/constants';
import backGround from '../../assets/Images/backGround.png';

function ConfirmPassword(props) {
  const [msg, setmsg] = useState({
    text: 'Check your email for a confirmation code',
    type: 'success',
  });
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  const [email, setemail] = useState(
    props.location?.state ? props.location?.state?.userName : '',
  );
  const history = useHistory();

  useEffect(() => {
    if (!props.location.state) {
      if (
        window.location.href.includes('confirmationcode=')
    && window.location.href.includes('/reset-password')
    && window.location.href.includes('email=')
      ) {
        const Data = {};
        Data.code = window.location.href
          .split('confirmationcode=')[1]
          .split('&email=')[0];
        form.setFieldsValue({
          code: Data.code,
          password: '',
        });
        setemail(window.location.href.split('email=')[1]);
      } else {
        history.push('/');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resendConfirmationCode = async () => {
    try {
      const { nextStep } = await resetPassword({ username: email });
      if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        setmsg('A new confirmation code has been sent.');
        setloading(false);
      }
    } catch (error) {
      console.log('error resend code :', error.message);
      setloading(false);
      setmsg({ text: error.message, type: 'error' });
    }
  };

  const confirmReset = async () => {
    setloading(true);
    setmsg({ text: '', type: '' });
    const formValue = form.getFieldsValue();
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: formValue.code,
        newPassword: formValue.password,
      });
      setloading(false);
      history.push({
        pathname: '/signin',
        state: { feedback: 'Signin with new password.', userName: '' },
      });
    } catch (error) {
      console.log('error resetting password:', error);
      setloading(false);
      setmsg({ text: error.message, type: 'error' });
    }
  };

  return (
    <>
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
            <Card style={{ border: 'none', width: '437px' }}>
              {msg?.text && (
              <Alert
                style={{ marginBottom: '10px' }}
                type={msg?.type}
                showIcon={false}
                message={msg.text}
                banner
              />
              )}
              <Form
                labelCol={{ xs: 24 }}
                requiredMark={false}
                layout="vertical"
                name="normal_reset"
                className="reset-form"
                form={form}
                onFinish={() => confirmReset()}
                autoComplete="off"
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  label={(
                    <small>
                      {' '}
                      <strong
                        style={{
                          fontSize: '18px',
                        }}
                      >
                        Confirmation Code
                      </strong>
                    </small>
        )}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Confirmation Code!',
                    },
                  ]}
                >
                  <Input
                    style={{ fontSize: 18 }}
                    id="code"
                    key="code"
                    name="code"
                    placeholder="Enter your confirmation code"
                    disabled={loading}
                    tabIndex={1}
                    type="number"
                  />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }}
                  style={{ fontSize: 18 }}
                  label={(
                    <small>
                      <strong style={{ fontSize: 18 }}>Password</strong>
                    </small>
        )}
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input.Password
                    id="password"
                    key="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    tabIndex={2}
                    autoFocus
                    autocomplete="new-password"
                  />
                </Form.Item>
                <Form.Item>
                  <Row justify="space-between" align="middle">
                    <Col span={8}>
                      <Button
                        type="link"
                        size="large"
                        block
                        onClick={resendConfirmationCode}
                        disabled={loading}
                        style={{ textAlign: 'left' }}
                        tabIndex={6}
                      >
                        <span style={{ color: COLORS.primaryText, fontWeight: '600' }}>
                          Resend Code
                        </span>
                      </Button>
                    </Col>
                    <Col span={10}>
                      <Button
                        style={{ fontSize: 18 }}
                        type="primary"
                        size="large"
                        htmlType="submit"
                        block
                        loading={loading}
                        tabIndex={5}
                      >
                        Submit
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
                IDA Portal copyright all rights
                reserved.
              </p>
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default ConfirmPassword;
