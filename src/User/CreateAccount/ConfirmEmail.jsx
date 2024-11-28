import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Input, message, Row,
} from 'antd';
import {
  confirmSignUp, resendSignUpCode, autoSignIn, fetchAuthSession,
} from 'aws-amplify/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { COLORS } from '../../Utils/constants';
import backGround from '../../assets/Images/backGround.png';
import { setAccessToken, setCurrentUser } from '../../store/slices/loginSlice';
import { CreateOrganization, CreateOrganizationRole } from '../UserActions';
import { setOrganization } from '../../store/slices/portalSlice';

function ConfirmEmail(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState('');
  const [msg, setmsg] = useState('Check your email for a confirmation code');
  const [email] = useState(props.location.state?.userName);
  const history = useHistory();

  useEffect(() => {
    if (!props.location.state) {
      if (
        window.location.href.includes('confirmationcode=')
    && window.location.href.includes('/confirm_sign_up')
      ) {
        const Data = {};
        Data.code = window.location.href
          .split('confirmationcode=')[1]
          .split('&email=')[0];
        Data.email = window.location.href.split('email=')[1];
        form.setFieldsValue({
          code: Data.code,
          email: Data.email,
        });
        handleConfirmSignUp(form.getFieldsValue(['email', 'code']));
      } else {
        history.push('/');
      }
    }
  }, []);

  const handleResendCode = async () => {
    setloading(true);
    console.log('code resend');
    seterror('');
    try {
      await resendSignUpCode({ username: email });
      setmsg('A new confirmation code has been sent.');
      setloading(false);
    } catch (error) {
      console.log('error signing up:', error);
      seterror(error.message);
      setmsg('');
      setloading(false);
    }
  };

  // Auto Login on confirm Signup

  const handleSingIn = async () => {
    try {
      const { nextStep } = await autoSignIn();
      if (nextStep?.signInStep === 'DONE') {
        const cognitoTokens = await fetchAuthSession();
        dispatch(setCurrentUser(cognitoTokens?.tokens.idToken.payload));
        dispatch(setAccessToken(cognitoTokens?.tokens.idToken?.toString()));
        history.push('/');
        return cognitoTokens?.tokens.idToken.payload;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCreateOrg = async (userData) => {
    const newOrgName = email.split('@')[0];
    const generatedUUID = uuidv4();
    const inputData = {
      rootID: userData.sub,
      id: generatedUUID,
      editGroups: `${generatedUUID}-edit`,
      fullGroups: `${generatedUUID}-full`,
      readGroups: `${generatedUUID}-read`,
      organizationName: newOrgName,
    };
    const orgData = await CreateOrganization(inputData);
    const roleInput = {
      role: 'ROOT',
      userID: userData.sub,
      organizationID: orgData.id,
    };
    const roleData = await CreateOrganizationRole(roleInput);
    dispatch(setOrganization(orgData));
    console.log('orgData', orgData, roleData);
  };

  const handleConfirmSignUp = async (e) => {
    const formValue = form.getFieldsValue();
    try {
      if (formValue.email && formValue.code) {
        const username = formValue.email;
        const confirmationCode = formValue.code;
        setloading(true);
        seterror('');
        const { isSignUpComplete } = await confirmSignUp({ username, confirmationCode });

        if (isSignUpComplete) {
          const userData = await handleSingIn();
          handleCreateOrg(userData);
        }
        setloading(false);
        history.push({
          pathname: '/signin',
          state: {
            feedback: 'Sign in with your new account',
            userName: formValue.email,
          },
        });
      } else {
        message.error('something went wrong');
      }
    } catch (error) {
      if (
        error.message.includes(
          'User cannot be confirmed. Current status is CONFIRMED',
        )
      ) {
        history.push('/');
        message.success('Already Verified');
      }
      console.log('error signing up:', error);
      setmsg('');
      seterror(error.message);
      setloading(false);
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
            style={{ border: 'none', width: '437px', padding: '0px' }}
          >

            {msg && (
            <Alert
              style={{ marginBottom: '10px' }}
              type="success"
              showIcon={false}
              message={msg}
              banner
            />
            )}
            {error !== '' && (
            <Alert
              style={{ marginBottom: '10px' }}
              type="error"
              showIcon={false}
              message={error}
              banner
              closable
            />
            )}
            <Form
              form={form}
              labelCol={{ xs: 24 }}
              requiredMark={false}
              layout="vertical"
              name="normal_signup"
              className="signup-form"
              onFinish={() => handleConfirmSignUp()}
            >
              <Form.Item
                initialValue={email}
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
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input
                  value={email}
                  id="email"
                  key="email"
                  name="email"
                  placeholder="Email"
                  disabled={localStorage.getItem('User')}
                  style={{ color: 'gray', fontSize: '18px' }}
                />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label={(
                  <Row>
                    <Col xs={12}>
                      <small>
                        <strong
                          style={{
                            fontSize: '18px',
                          }}
                        >
                          Code
                        </strong>
                      </small>
                    </Col>
                    <Col xs={12} style={{ textAlign: 'end' }}>
                      <Button
                        type="link"
                        size="large"
                        onClick={handleResendCode}
                        disabled={loading}
                        style={{
                          color: COLORS.primaryText,
                          fontSize: '16px',
                          fontWeight: 700,
                        }}
                        tabIndex={4}
                      >
                        Resend Code
                      </Button>
                    </Col>
                  </Row>
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
                  autoFocus
                  id="code"
                  key="code"
                  name="code"
                  placeholder="Enter your confirmation code"
                  disabled={loading}
                  tabIndex={1}
                />
              </Form.Item>

              <Form.Item>
                <Row justify="space-between" align="middle">
                  <Col span={8}>
                    <Button
                      type="link"
                      size="large"
                      block
                      onClick={() => history.push('/signin')}
                      disabled={loading}
                      style={{ textAlign: 'left' }}
                      tabIndex={6}
                    >
                      <span
                        style={{
                          color: COLORS.primaryText,
                          fontWeight: '600',
                          fontSize: '18px',
                        }}
                      >
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
                      <span style={{ fontSize: '18px' }}>Confirm</span>
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
  );
}

export default ConfirmEmail;
