/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Input, Row,
} from 'antd';
import './login.css';
import { useHistory } from 'react-router';
import { signIn, fetchAuthSession } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { COLORS, emailPattern } from '../../Utils/constants';
import { setAccessToken, setCurrentUser } from '../../store/slices/loginSlice';
import backGround from '../../assets/Images/backGround.png';

export default function Login() {
  const history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoging] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  // Function to login submit
  const onSubmit = async () => {
    setLoging(true);
    const formValue = form.getFieldsValue();
    try {
      const username = formValue?.username?.trim();
      const password = formValue?.password;
      const data = await signIn({ username, password });

      console.log('data', data);
      if (data?.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        history.push({
          pathname: '/create-password',
          state: { username: formValue?.username?.trim(), oldPassword: formValue.password },
        });
      } else {
        const cognitoTokens = await fetchAuthSession();
        dispatch(setCurrentUser(cognitoTokens?.tokens.idToken.payload));
        dispatch(setAccessToken(cognitoTokens?.tokens.idToken?.toString()));
        history.push('/');
      }

      setLoging(false);
    } catch (err) {
      setLoging(false);
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <Row justify="center" align="middle" className="h-100vh">
      <Col xs={0} md={0} lg={8}>
        <img
          src={backGround}
          alt="backGround"
          style={{
            height: '100vh',
            minHeight: 580,
            objectFit: 'cover',
          }}
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
              form={form}
              layout="vertical"
              name="normal_login"
              className="login-form"
              onFinish={() => onSubmit()}
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
                initialValue={email}
                name="username"
                rules={[
                  { required: true, message: 'Please input your Email!' },
                  {
                    pattern: emailPattern,
                    message: 'Please provide valid Email!',
                  },
                ]}
              >
                <Input
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="username"
                  key="username"
                  name="username"
                  placeholder="Your email id"
                  disabled={loading}
                  tabIndex={1}
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label={(
                  <Row
                    className="remember_forget_pass"
                    style={{ margin: 0, width: '100%' }}
                  >
                    <Col xs={12} lg={12}>
                      <small>
                        <strong
                          style={{
                            fontSize: '18px',
                          }}
                        >
                          Password
                        </strong>
                      </small>
                    </Col>
                    <Col xs={12} lg={12} style={{ textAlign: 'end' }}>
                      <Button
                        type="link"
                        size="large"
                        onClick={() => history.push('/forgot-password')}
                        disabled={loading}
                        tabIndex={3}
                        style={{
                          color: COLORS.primaryText,
                          fontSize: '16px',
                          fontWeight: 700,
                        }}
                      >
                        Forgot your password?
                      </Button>
                    </Col>
                  </Row>
       )}
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  className=""
                  value={password}
                  id="password"
                  key="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  disabled={loading}
                  tabIndex={2}
                />
              </Form.Item>

              <Form.Item>
                <Row justify="space-between" align="middle">
                  <Col span={12}>
                    <Button
                      type="link"
                      size="large"
                      block
                      onClick={() => history.push('/signup')}
                      disabled={loading}
                      style={{ textAlign: 'left' }}
                      tabIndex={4}
                    >
                      <span
                        style={{ color: '#F26539', fontWeight: '600', fontSize: '18px' }}
                      >
                        Create Account
                      </span>
                    </Button>
                  </Col>
                  <Col span={10}>
                    <Button
                      type="primary"
                      size="medium"
                      htmlType="submit"
                      block
                      loading={loading}
                    >
                      <span style={{ fontSize: '18px' }}>Login</span>
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Row>
      </Col>
    </Row>
  );
}
