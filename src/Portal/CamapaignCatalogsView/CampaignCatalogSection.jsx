/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Row, Col, Skeleton, Collapse, Table, Avatar, Checkbox,
} from 'antd';
import CatalogPreviewComponent from './CatalogPreviewComponent';
import './Catalog.css';

const { Panel } = Collapse;

function CampaignCatalogSection(props) {
  const {
    isLoading, venueCataLogData, setVenueCatalogItemsArray, venueCatalogItemsArray,
  } = props;
  const [venueItemData, setVenueItemData] = useState([]);
  const [selectedPrestIds, setSelectedPrestIds] = useState([]);

  const handleSelectChange = (e, venueData) => {
    e.stopPropagation();
    if (selectedPrestIds.includes(venueData?.id)) {
      setSelectedPrestIds(selectedPrestIds.filter((itemId) => itemId !== venueData.id));
      const relatedVenueCatalogItemIds = venueData?.venueCatalogItems?.items.map(
        (item) => item?.id,
      );
      setVenueCatalogItemsArray(
        venueCatalogItemsArray.filter(
          (id) => !relatedVenueCatalogItemIds.includes(id),
        ),
      );
    } else {
      setSelectedPrestIds([...selectedPrestIds, venueData?.id]);
      const relatedVenueCatalogItemIds = venueData.venueCatalogItems.items.map(
        (item) => item.id,
      );
      setVenueCatalogItemsArray([
        ...venueCatalogItemsArray,
        ...relatedVenueCatalogItemIds,
      ]);
    }
  };

  const handleCheckBoxClick = (e, record) => {
    const updatedVenueCatalogItemsArray = venueCatalogItemsArray.includes(record?.id)
      ? venueCatalogItemsArray.filter((itemId) => itemId !== record.id)
      : [...venueCatalogItemsArray, record?.id];

    setVenueCatalogItemsArray(updatedVenueCatalogItemsArray);

    const relatedPreset = venueCataLogData
      .find((preset) => preset.venueCatalogItems.items.some((item) => item.id === record.id));

    if (relatedPreset) {
      const allPresetItems = relatedPreset.venueCatalogItems.items.map((item) => item.id);
      const allPresetItemsSelected = allPresetItems
        .every((itemId) => updatedVenueCatalogItemsArray.includes(itemId));

      if (allPresetItemsSelected) {
        setSelectedPrestIds([...selectedPrestIds, relatedPreset.id]);
      } else {
        setSelectedPrestIds(selectedPrestIds.filter((presetId) => presetId !== relatedPreset.id));
      }
    }

    setVenueItemData(record);
  };

  useEffect(() => {
    const initialVenueCatalogItemIds = [];
    const presetIds = [];
    venueCataLogData.forEach((prset) => {
      const prsetVenueCatalogItems = prset.venueCatalogItems.items;
      presetIds.push(prset.id);
      prsetVenueCatalogItems.forEach((item) => {
        initialVenueCatalogItemIds.push(item.id);
      });
    });
    setVenueCatalogItemsArray(initialVenueCatalogItemIds);
    setSelectedPrestIds(presetIds);
    setVenueItemData(venueCataLogData[0]?.venueCatalogItems?.items[0] || {});
  }, [venueCataLogData]);

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_, record) => (
        <Checkbox
          checked={venueCatalogItemsArray?.length > 0
           && venueCatalogItemsArray.includes(record?.id)}
          onClick={(e) => handleCheckBoxClick(e, record)}
        />
      ),
    },
    {
      title: 'Photo',
      width: '15%',
      dataIndex: 'thumbnail',
      render: (text, record) => (record?.image ? (
        <Avatar
          shape="square"
          size={45}
          icon={<img src={record?.image} alt="" />}
        />
      ) : (
        <Avatar style={{ backgroundColor: '#87d068' }} size="large" shape="square">
          {record?.venueItemName.charAt(0).toUpperCase()}
        </Avatar>
      )),
    },
    {
      title: 'Name',
      width: '25%',
      dataIndex: 'venueItemName',
    },
  ];

  return (
    <Row gutter={[24, 24]} style={{ height: 'calc(100vh - 64px - 138px)' }}>
      <Col span={12} sx={24} className="h-full overflow-auto">
        { !isLoading ? (
          <Collapse defaultActiveKey={['0']} style={{ marginTop: '20px' }}>
            {venueCataLogData?.length > 0 && venueCataLogData.map((venueType, index) => (
              <Panel
                header={venueType?.venuePrsetName}
                key={index}
                style={{ marginBottom: '5px' }}
                extra={(
                  <Checkbox
                    checked={selectedPrestIds?.length > 0
                    && selectedPrestIds.includes(venueType?.id)}
                    onClick={(e) => handleSelectChange(e, venueType)}
                  />
          )}
              >
                <div key={index}>
                  {venueType?.venueCatalogItems?.items.length > 0
                && (
                <Table
                  dataSource={venueType?.venueCatalogItems?.items}
                  columns={columns}
                  pagination={false}
                  rowKey={(record) => `${index}-${record.id}`}
                />
                )}

                </div>
              </Panel>
            ))}
          </Collapse>
        ) : <Skeleton active className="SkeletonWidth mt-20" /> }
      </Col>
      <Col span={12}>
        {Object.keys(venueItemData).length > 0
         && <CatalogPreviewComponent catalogItem={venueItemData} />}
      </Col>
    </Row>
  );
}

export default CampaignCatalogSection;
