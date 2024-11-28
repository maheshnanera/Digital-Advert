import React from 'react';
import {
  Card, Typography, Space, Empty,
  Button,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

function NoCardState({
  handleSubmit,
}) {
  return (
    <Card style={{ marginBottom: 16, maxWidth: 300 }}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={(
          <Space direction="vertical" align="center">
            <Text>No card added yet</Text>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleSubmit}
            >
              Add Card
            </Button>
          </Space>
      )}
      />
    </Card>
  );
}

export default NoCardState;
