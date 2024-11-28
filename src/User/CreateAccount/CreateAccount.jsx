/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { signUp } from 'aws-amplify/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
} from 'libphonenumber-js';
import { emailPattern, COLORS } from '../../Utils/constants';
import backGround from '../../assets/Images/backGround.png';

function CreateAccount() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countryCodes, setCountryCodes] = useState('');
  const [Tnc, setTnc] = useState(false);
  const [form] = Form.useForm();

  const handleSignUp = async () => {
    const formValue = form.getFieldsValue();
    if (formValue.firstName.length <= 1 || formValue.lastName.length <= 1) {
      setError('Please enter valid name');
    } else {
      setLoading(true);
      setError('');
      const callingCode = getCountryCallingCode(formValue.phoneNumber.prefix);
      try {
        await signUp({
          username: formValue.email,
          password: formValue.password,
          options: {
            userAttributes: {
              email: formValue.email,
              given_name: formValue.firstName,
              family_name: formValue.lastName,
              phone_number: `+${callingCode}${formValue.phoneNumber.number}`,

            },
            autoSignIn: true,
          },
        });
        setLoading(false);
        history.push({
          pathname: '/confirm_sign_up',
          state: { feedback: '', userName: formValue.email },
        });
        localStorage.setItem('User', window.btoa(formValue.email));
      // eslint-disable-next-line no-shadow
      } catch (error) {
        console.log('error signing up:', error);
        setError(error.message);
        setLoading(false);
      }
    }
  };

  // Function to get the list of country codes
  const getCountryCodes = () => {
    const countries = getCountries();
    return countries.map((country) => ({
      countryCode: country,
      callingCode: getCountryCallingCode(country),
    }));
  };

  useEffect(() => {
    const countryCodesData = getCountryCodes();
    setCountryCodes(countryCodesData);
  }, []);

  //  This will check the number for that country
  function isValidPhoneNumberForCountry(phoneNumberString, country) {
    const phoneNumber = parsePhoneNumber(phoneNumberString, {
      defaultCountry: country,
      extract: false,
    });
    if (!phoneNumber) {
      return false;
    }
    if (phoneNumber.country !== country) {
      return false;
    }
    return phoneNumber.isValid();
  }

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
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            minHeight: 580,
          }}
        >
          <Card
            className="card-container"
            style={{
              border: 'none', width: '45%', padding: '0px', height: '80vh',
            }}
          >
            {error && (
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
              name="normal_signup"
              className="signup-form"
              onFinish={() => handleSignUp()}
            >
              <Form.Item
                label={(
                  <small>
                    <strong style={{ fontSize: '18px' }}>First Name</strong>
                  </small>
       )}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your First Name!',
                  },
                  {
                    pattern: /^[a-zA-Z]+$/,
                    message: 'Symbol, number or whitespace are not allowed',
                  },
                ]}
              >
                <Input
                  id="firstName"
                  key="firstName"
                  name="firstName"
                  placeholder="Your first name"
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item
                label={(
                  <small>
                    <strong style={{ fontSize: '18px' }}>Last Name</strong>
                  </small>
       )}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Last Name!',
                  },
                  {
                    pattern: /^[a-zA-Z]+$/,
                    message: 'Symbol, number or whitespace are not allowed',
                  },
                ]}
              >
                <Input
                  id="lastName"
                  key="lastName"
                  name="lastName"
                  placeholder="Your last name"
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item
                label={(
                  <small>
                    <strong style={{ fontSize: '18px' }}>Email</strong>
                  </small>
       )}
                name="email"
                rules={[
                  { required: true, message: 'Please input your Email!' },
                  { pattern: emailPattern, message: 'Please provide valid Email!' },
                ]}
              >
                <Input
                  id="email"
                  key="email"
                  name="email"
                  placeholder="Your email id"
                  disabled={loading}
                  type="email"
                />
              </Form.Item>
              <Form.Item
                label={(
                  <small>
                    <strong style={{ fontSize: '18px' }}>Phone Number</strong>
                  </small>
       )}
                name="phoneNumber"
              >
                <Input.Group compact>
                  <Form.Item
                    name={['phoneNumber', 'prefix']}
                    noStyle
                    rules={[
                      { required: true, message: 'Please input your country code!' },
                    ]}
                  >
                    <Select
                      placeholder="Country Code"
                      style={{ width: '25%', marginRight: '10px !important' }}
                      disabled={loading}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) => (option?.children ?? '').includes(input)}
                      initialValues="+1"
                    >
                      {countryCodes?.length > 0
            && countryCodes.map((country) => (
              <Select.Option
                key={country.countryCode}
                value={country.countryCode}
              >
                {`+${country.callingCode} (${country.countryCode})`}
              </Select.Option>
            ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={['phoneNumber', 'number']}
                    noStyle
                    rules={[
                      { required: true, message: 'Please input your Phone Number!' },
                      {
                        validator: (_, value) => {
                          const completePhoneNumber = form.getFieldValue([
                            'phoneNumber',
                            'prefix',
                          ]);
                          const valid = isValidPhoneNumberForCountry(
                            value,
                            completePhoneNumber,
                          );
                          if (!value || valid) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Please provide a valid phone number!');
                        },
                      },
                    ]}
                  >
                    <Input
                      style={{ width: '70%' }}
                      placeholder="Phone Number"
                      disabled={loading}
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item
                label={(
                  <small>
                    <strong style={{ fontSize: '18px' }}>Create Password</strong>
                  </small>
       )}
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                  { min: 8, message: 'Password must be minimum 8 characters.' },
                ]}
              >
                <Input.Password
                  id="password"
                  key="password"
                  name="password"
                  type="password"
                  placeholder="Create password "
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item>
                <Checkbox onChange={(e) => setTnc(e.target.checked)} checked={Tnc}>
                  I agree to the
                  {' '}
                  <a
          //  Add t&c link here
                    href=""
                    style={{ color: COLORS.primaryText }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms and Conditions
                  </a>
                </Checkbox>
              </Form.Item>
              <div style={{ paddingBottom: 20 }}>
                By registering, you agree to the processing of your personal data by IDA
                Portal as described in our
                {' '}
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: COLORS.primaryText }}
                >
                  Privacy Policy
                </a>
              </div>
              <Form.Item style={{ marginBottom: '10px' }}>
                <Row justify="space-between" align="middle">
                  <Col span={8}>
                    <Button
                      type="link"
                      size="large"
                      block
                      onClick={() => history.push('/signin')}
                      disabled={loading}
                    >
                      <span
                        style={{
                          color: '#F26539 ',
                          fontWeight: '600',
                          fontSize: '18px',
                        }}
                      >
                        Login
                      </span>
                    </Button>
                  </Col>
                  <Col span={10}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                      disabled={!Tnc}
                    >
                      <span style={{ fontSize: '18px' }}>Sign Up</span>
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>

            <div style={{ marginTop: 30 }}>
              <p
                style={{
                  color: '#646C79',
                  fontSize: '16px',
                  textAlign: 'center',
                  fontWeight: '500',
                  userSelect: 'none',
                  marginBottom: '0px',
                  marginTop: 4,
                }}
              >
                Version : 0.1.0
              </p>
              <p style={{ fontSize: '16px', color: '#646C79', textAlign: 'center' }}>
                &copy;
                {' '}
                {new Date().getFullYear()}
                {' '}
                IDA Portal copyright all rights
                reserved.
              </p>
            </div>
          </Card>
        </Row>
      </Col>
    </Row>
  );
}

export default CreateAccount;
