/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Col, Form, Input, Row, Select,
} from 'antd';
import { useHistory } from 'react-router';
import {
  confirmSignIn,
  signIn, fetchAuthSession,
} from 'aws-amplify/auth';
import { jwtDecode } from 'jwt-decode';
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
} from 'libphonenumber-js';
import { useDispatch } from 'react-redux';
import { setAccessToken, setCurrentUser } from '../../store/slices/loginSlice';
import { getOrganizationByUserCustom } from '../UserActions';
import backGround from '../../assets/Images/backGround.png';
import { setUserOrganizations, setOpenJoinOrgModal } from '../../store/slices/orgSlice';

function CreatePassword(props) {
  const [msg, setmsg] = useState({ text: '', type: 'success' });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [countryCodes, setCountryCodes] = useState('');
  const [email, setemail] = useState(
    props.location?.state ? props.location?.state?.username : '',
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.location?.state) {
      const email = props.location?.state?.username;
      if (email) {
        setemail(email);
      } else {
        history.push('/');
      }
    } else {
      history.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleUpdateProfile = async (value) => {
    console.log('Update profile ', value);
    // let init = {
    //  body: {
    //   ...value,
    //  },
    // };

  // API.post('exploricsREST', `/user/update`, init)
  //  .then((data) => {})
  //  .catch((error) => {
  //   console.log(error);
  //  });
  };

  const confirmChangePassword = async (values) => {
    setLoading(true);
    const oldPassword = props.location?.state?.oldPassword;
    console.log('oldPassword', oldPassword);
    if (oldPassword) {
      const newPassword = form.getFieldValue('password');
      await signIn({ username: email, password: oldPassword });

      const { isSignedIn, nextStep } = await confirmSignIn({
        challengeResponse: newPassword,
      });
      const cognitoTokens = await fetchAuthSession();

      const user = jwtDecode(cognitoTokens?.tokens.idToken?.toString());
      dispatch(setCurrentUser(cognitoTokens?.tokens.idToken.payload));
      dispatch(setAccessToken(cognitoTokens?.tokens.idToken?.toString()));
      history.push('/');
      const data = await getOrganizationByUserCustom(cognitoTokens?.tokens.idToken.payload?.sub);
      console.log('orgmisain data', user, data, data.items);

      dispatch(setOpenJoinOrgModal(true));
      dispatch(setUserOrganizations(data?.items));
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
    const countryCodes = getCountryCodes();
    setCountryCodes(countryCodes);
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              height: '100vh',
              minHeight: 580,
            }}
          >
            <Card
              className="card-container"
              style={{
                border: 'none', width: '45%', padding: '0px', height: '80vh',
              }}
            >
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
                onFinish={(e) => confirmChangePassword(e)}
                autoComplete="off"
                form={form}
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
                        First Name
                      </strong>
                    </small>
        )}
                  name="given_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your First Name!',
                    },
                    {
                      pattern: /^[a-zA-Z]+$/,
                      message: 'symbol, number or whitespace are not allowed',
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
                      {' '}
                      <strong
                        style={{
                          fontSize: '18px',
                        }}
                      >
                        Last Name
                      </strong>
                    </small>
        )}
                  name="family_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Last Name!',
                    },
                    {
                      pattern: /^[a-zA-Z]+$/,
                      message: 'symbol, number or whitespace are not allowed',
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
                  name="email"
                >
                  <Input
                    autoFocus
                    value={email}
                    id="userName"
                    key="userName"
                    name="userName"
                    placeholder="Email"
                    disabled
                    tabIndex={1}
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
                  labelCol={{ span: 24 }}
                  style={{ fontSize: 18 }}
                  label={(
                    <small>
                      <strong style={{ fontSize: 18 }}>Create Password</strong>
                    </small>
        )}
                  name="password"
                  rules={[{ required: true, message: 'Please Enter Password' },
                    { min: 8, message: 'Password must be minimum 8 characters.' },
                  ]}
                >
                  <Input.Password
                    id="password"
                    key="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    tabIndex={2}
                    autocomplete="new-password"
                    size="middle"
                  />
                </Form.Item>
                <Form.Item>
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
                </Form.Item>
              </Form>
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
            </Card>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default CreatePassword;
