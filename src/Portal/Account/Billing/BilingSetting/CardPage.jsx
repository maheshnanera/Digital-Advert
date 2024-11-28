import React from 'react';
import { Card, Typography, Space } from 'antd';
import { CreditCardOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Text } = Typography;

function CardPage({
  isDefault = true,
}) {
  const { organization } = useSelector((state) => state.portal);

  const getCardIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'amex':
        return '💳';
      default:
        return <CreditCardOutlined />;
    }
  };

  return (
    <Card
      style={{ marginBottom: 16, maxWidth: 300 }}
      extra={isDefault && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
    >
      <Space direction="vertical" size="small">
        <Space>
          {`${getCardIcon(organization?.cardCompanyName)} ${organization?.cardCompanyName}`}
        </Space>
        <Text>
          **** **** ****
          {' '}

          {organization?.cardLastDigit}
        </Text>
        <Text type="secondary">{organization?.accountHolderName}</Text>
        {isDefault && <Text type="success">Default Card</Text>}
      </Space>
    </Card>
  );
}

export default CardPage;
