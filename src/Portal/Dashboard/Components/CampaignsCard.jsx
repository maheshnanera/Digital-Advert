import React from 'react';
import {
  Card, Col, Row, Dropdown, Menu,
} from 'antd';
import '../dashboard.css';
import {
  AccountBookOutlined, UnorderedListOutlined, DotChartOutlined, CalendarOutlined, DeleteOutlined,
} from '@ant-design/icons';

function CampaignsCard(props) {
  const { handleDelete, handleCardClick, filteredCampaigns } = props;

  const getFormattedDateRange = (date) => {
    const currentDate = new Date(date);
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  return (
    <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
      {filteredCampaigns.map((item) => (
        <Col sm={6} xs={24} key={item.id} className="campaign-card">
          <Card
            title={(
              <span style={{ fontSize: '14px', color: item.isLaunched ? 'green' : 'gray' }}>
                <DotChartOutlined />
                {' '}
                {' '}
                {item?.isLaunched ? 'Live' : 'Draft'}
              </span>
   )}
            extra={(
              <Dropdown
                overlay={(
                  <Menu onClick={() => handleDelete(item)}>
                    <Menu.Item key="delete" icon={<DeleteOutlined />}>
                      Delete
                    </Menu.Item>
                  </Menu>
    )}
                trigger={['click']}
              >
                <UnorderedListOutlined style={{ color: 'rgb(242, 101, 57, 0.5)', cursor: 'pointer' }} />
              </Dropdown>
  )}
            style={{ borderRadius: '8px' }}
          >
            <div
              className="flex flexColumn gap-10 cursor-pointer"
              onClick={() => handleCardClick(item)}
              onKeyUp={() => handleCardClick(item)}
              tabIndex={0}
              role="button"
            >
              <div className="flex  items-center gap-15 mb-20">
                <span style={{ fontSize: '16px' }}>{item?.CampaignName}</span>
              </div>
              <div className="flex flexRow gap-10  pl-4" style={{ fontSize: '14px' }}>
                <AccountBookOutlined style={{ fontSize: '20px' }} twoToneColor="rgb(242, 101, 57, 0.4)" />
                £
                {' '}
                {item?.payingAmount}
              </div>
              <div className="flex flexRow gap-10  pl-4">
                {' '}
                <CalendarOutlined style={{ fontSize: '20px' }} twoToneColor="rgb(242, 101, 57, 0.4)" />
                <span className="py-1" style={{ fontSize: '14px' }}>
                  {`${getFormattedDateRange(item.startTime)} - ${getFormattedDateRange(new Date(item.endTime))}`}
                </span>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CampaignsCard;
