/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Layout, Carousel, Card, Table, Input, Typography, Space,
  Skeleton,
} from 'antd';
import { DollarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const { Text } = Typography;

function ReviewCampaignPage(props) {
  const {
    campaignVenus, isVenueLoading, isMediaLoading, mediaContentData,
    campaignBudget = 100,
  } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const { newCampaign } = useSelector((state) => state.campaign);

  const [carouselRef, setCarouselRef] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const nextSlide = () => {
    if (carouselRef) {
      carouselRef.next();
    }
  };

  const prevSlide = () => {
    if (carouselRef) {
      carouselRef.prev();
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'mediaName',
      key: 'mediaName',
    },
    {
      title: 'Media Type',
      dataIndex: 'contentType',
      key: 'contentType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  function SkeletonLoader() {
    return (
      <div style={{ position: 'relative' }}>
        <div className="flex-imp items-center justify-center skeleton-image-review">
          <Skeleton.Image active style={{ width: '50%', height: 300 }} />
        </div>
        <Space className="flex-imp mt-20 justify-center">
          <LeftOutlined className="cursor-not-allowed opacity-50 cursor-not-allowed" />
          <Skeleton.Button active size="small" style={{ width: 50 }} />
          <RightOutlined className="cursor-not-allowed opacity-50 cursor-not-allowed" />
        </Space>
      </div>
    );
  }
  function formatDateToDDMMYYYY(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();

    // Return formatted date
    return `${day}/${month}/${year}`;
  }

  return (
    <Content style={{ padding: '12px' }}>
      <Card title="Selected Venues" style={{ marginBottom: 24 }} className="carouselImage">
        {isVenueLoading ? (
          <SkeletonLoader />
        ) : campaignVenus?.length > 0 ? (
          <div style={{ position: 'relative' }}>
            <Carousel ref={setCarouselRef} {...settings}>
              {campaignVenus.map((venue) => (
                <div key={venue.id} className="flex-imp items-center justify-center">
                  <img
                    src={venue.image}
                    alt={`Venue ${venue.id}`}
                    style={{ width: '50%', height: '300px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </Carousel>
            <Space className="flex-imp mt-20 justify-center">
              <LeftOutlined
                className="cursor-pointer"
                onClick={prevSlide}
              />
              <Text>{`${currentSlide + 1}/${campaignVenus.length}`}</Text>
              <RightOutlined
                className="cursor-pointer"
                onClick={nextSlide}
              />
            </Space>
          </div>
        ) : (
          <Text>No venues selected</Text>
        )}
      </Card>
      <Card title="Selected Media" style={{ marginBottom: 24 }} className="carouselImage">
        {isMediaLoading ? <Skeleton active />
          : <Table columns={columns} dataSource={mediaContentData} pagination={false} />}
      </Card>

      <Card
        title="Budget"
        className="carouselImage"
        extra={<DollarOutlined />}
        style={{ marginBottom: 24, backgroundColor: '#f0f5ff', borderColor: '#1890ff' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Input
            prefix="£"
            suffix="GBP"
            placeholder="Enter campaign budget"
            style={{ width: '100%' }}
            disabled
            value={campaignBudget}
          />
          <Text type="secondary">
            This is the total amount in GBP to run your campaign for Start:
            {' '}
            {formatDateToDDMMYYYY(newCampaign?.startTime)}
            {' '}
            to End :
            {' '}
            {formatDateToDDMMYYYY(newCampaign?.endTime)}
          </Text>
        </Space>
      </Card>
    </Content>
  );
}

export default ReviewCampaignPage;
