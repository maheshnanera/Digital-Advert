import React, { useEffect, useState } from 'react';
import {
  Modal, Form, Input, Select, Button, Row, Col, Checkbox,
} from 'antd';
import { useSelector } from 'react-redux';
// import { checkVAT, countries } from 'jsvat';
import { COUNTRY_LIST, CURRENCY_LIST, LANG_LIST } from '../../../../Utils/constants';

function EditBillingInfoModal(props) {
  const {
    onCancel, onUpdateInfo, loading, fromCampaignReview = false,
  } = props;
  const { openBillingModal } = useSelector((state) => state.portal);
  const [selectedCountry, setSelectedCountry] = useState('GB');
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [selectedLang, setSelectedLang] = useState('eng');

  const [Tnc, setTnc] = useState(false);

  const [form] = Form.useForm();

  const { organization } = useSelector((state) => state.portal);

  useEffect(() => {
    if (organization) {
      const data = {
        ...organization,
        currency: 'GBP',
      };
      form.setFieldsValue(data);
    }
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values:', values);
        onUpdateInfo(values);
      })
      .catch((err) => {
        console.error('Validation Error:', err);
      });
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };
  const handleCurrencyChange = (value) => {
    setSelectedCurrency(value);
  };
  const handleLangChange = (value) => {
    setSelectedLang(value);
  };

  // const validateVAT = (rule, value) => {
  //   if (!value || !selectedCountry) {
  //     return Promise.resolve();
  //   }
  //   const countryObject = countries.find((country) => country.codes.includes(selectedCountry));

  //   if (!countryObject) {
  //     return Promise.reject('Invalid country for VAT validation');
  //   }
  //   const result = checkVAT(value, [countryObject]);
  //   if (result.isValidFormat) {
  //     return Promise.resolve();
  //   }
  //   return Promise.reject('Invalid VAT number');
  // };

  return (
    <div>
      <Modal
        title="Edit Billing Info"
        open={openBillingModal}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} loading={loading} disabled={loading || !Tnc}>
            {fromCampaignReview ? 'Next' : 'Save'}
          </Button>,
        ]}
        onCancel={onCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" className="formMargin">
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
                initialValue={selectedCountry}
                rules={[{ required: true, message: 'Please select a country' }]}
              >
                <Select
                  value={selectedCountry}
                  className="searchableInput"
                  showSearch
                  style={{ width: '100%' }}
                  onChange={handleCountryChange}
                >
                  {
                    COUNTRY_LIST.map((currency) => (
                      <Select.Option
                        key={currency.value}
                        value={currency.value}
                      >
                        {currency.label}
                      </Select.Option>
                    ))
}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="currency"
                label="Currency"
                initialValue={selectedCurrency}
                rules={[{ required: true, message: 'Please select a currency' }]}
              >
                <Select
                  defaultValue={selectedCurrency}
                  className="searchableInput"
                  showSearch
                  disabled
                  style={{ width: '100%' }}
                  onChange={handleCurrencyChange}
                >
                  {
                    CURRENCY_LIST.map((currency) => (
                      <Select.Option
                        key={currency.value}
                        value={currency.value}
                      >
                        {currency.label}
                      </Select.Option>
                    ))
}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item
                name="VATNumber"
                label="VAT Number"
                // rules={[{ validator: validateVAT }]}
              >
                <Input placeholder="DE123456789" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="billingLanguage"
                label="Billing Language"
                initialValue={selectedLang}
              >
                <Select
                  className="searchableInput"
                  showSearch
                  defaultValue={selectedLang}
                  values={selectedLang}
                  style={{ width: '100%' }}
                  onChange={handleLangChange}
                >
                  {
                    LANG_LIST.map((currency) => (
                      <Select.Option
                        key={currency.value}
                        value={currency.value}
                      >
                        {currency.label}
                      </Select.Option>
                    ))
}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              { required: true, message: 'Please enter an address' },
              { max: 100, message: 'Address cannot exceed 100 characters' },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item
                name="postalCode"
                label="Postal Code"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a postal code',
                  },
                  {
                    pattern: /^\d{5}$/,
                    message: 'Invalid postal code format',
                  },
                ]}
              >
                <Input placeholder="Postal code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  { required: true, message: 'Please enter a city' },
                  { max: 50, message: 'City name cannot exceed 50 characters' },
                ]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="flex flex-row">
          <Checkbox
            onChange={(e) => setTnc(e.target.checked)}
            checked={Tnc}
          >
            I hereby confirm that the information I have provided are correct
            and agree to electronic storage and processing of personal data.
          </Checkbox>
        </div>
      </Modal>
    </div>
  );
}

export default EditBillingInfoModal;
