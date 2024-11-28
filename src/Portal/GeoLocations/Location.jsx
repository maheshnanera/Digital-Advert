import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Button, Row, Table, Skeleton, Popconfirm, Space, Tag,
} from 'antd';
import AddScreenGeoModal from './Components/AddScreenGeoModal';
import {
  CreateScreenGeoLocation, DeleteScreenGeoLocation,
  ListScreenGeoLocation, ListVenueCatalogItems, UpdateScreenGeoLocation,
} from '../../User/UserActions';
import { randomColor } from '../../Utils/constants';

export default function Location() {
  const [isOpenScreenModal, setIsOpenScreenModal] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState({});
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [venueCatalogData, setVenueCatalogData] = useState([]);
  const [allVenueTypeIds, setAllVenueTypeIds] = useState([]);

  const fetchScreenLocations = async () => {
    setIsLoading(true);
    const data = await ListScreenGeoLocation();
    setLocations(data?.items || []);
    setIsLoading(false);
  };

  const fetchVenueCataLogItemsForOrg = async () => {
    setIsLoading(true);
    const data = await ListVenueCatalogItems();
    console.log('data', data.items);
    setVenueCatalogData(data?.items || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchScreenLocations();
    fetchVenueCataLogItemsForOrg();
  }, []);

  useEffect(() => {
    if (venueCatalogData?.length > 0) {
      const allIds = venueCatalogData
        .flatMap((catalogItem) => catalogItem
          .venueCatalogItems?.items?.map((item) => item.id) || []);
      setAllVenueTypeIds(allIds);
    }
  }, [venueCatalogData]);

  //  this is for the add screen for the country
  const handleAddScreenLocation = async (formValues) => {
    const {
      country, latitude, longitude, venueTypes, height, width, maxCapacity,
    } = formValues;
    let pasdedItem = allVenueTypeIds;
    if (venueTypes) {
      pasdedItem = venueTypes;
    }
    setIsLoading(true);
    const inputData = {
      lat: parseFloat(latitude ?? 0),
      lng: parseFloat(longitude ?? 0),
      targetCountry: country,
      targetVenues: pasdedItem,
      height,
      width,
      maxCapacity,
      isAllVenueSelected: !venueTypes,
    };
    console.log('inputData', inputData);
    if (Object.keys(recordToEdit)?.length > 0) {
      await UpdateScreenGeoLocation({ ...inputData, id: recordToEdit?.id });
    } else {
      await CreateScreenGeoLocation(inputData);
    }
    setIsOpenScreenModal(false);
    setRecordToEdit({});
    fetchScreenLocations();
  };

  const handleDeleteDevice = async (record) => {
    await DeleteScreenGeoLocation(record?.id);
    fetchScreenLocations();
  };

  const handleEditDevice = async (record) => {
    setRecordToEdit(record);
    setIsOpenScreenModal(true);
  };

  const columns = [
    {
      title: 'Target Country',
      dataIndex: 'targetCountry',
      key: 'targetCountry',
    },
    {
      title: 'Device Id',
      dataIndex: 'id',
      key: 'id',
    },

    {
      title: 'Height (px)',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Width (px)',
      dataIndex: 'width',
      key: 'width',
    },
    {
      title: 'Device Capacity',
      dataIndex: 'maxCapacity',
      key: 'maxCapacity',
    },
    {
      title: 'Venue Types',
      dataIndex: 'targetVenues',
      key: 'targetVenues',
      render: (text, record) => (
        <div>
          {
          record?.isAllVenueSelected
            ? (
              <Tag
                color={randomColor[Math.floor(Math.random() * 11)] || 'magenta'}
                key="All"
              >
                All Venues Selected
              </Tag>
            )
            : record?.targetVenues?.map((venueId) => {
              const venueItem = venueCatalogData
                ?.flatMap((catalog) => catalog
                  .venueCatalogItems.items.filter((item) => item.id === venueId));
              return venueItem.map((item) => (
                <Tag
                  color={randomColor[Math.floor(Math.random() * 11)] || 'magenta'}
                  key={item.id}
                >
                  {item.venueItemName}
                </Tag>
              ));
            })
          }
        </div>

      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEditDevice(record)} />
          <Popconfirm
            title="Are you sure to Delete this record?"
            onConfirm={() => handleDeleteDevice(record)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flexColumn h-full">
      <Row className="justify-between">
        <div className="page-header">Devices</div>
        <Button type="primary" size="large" onClick={() => setIsOpenScreenModal(true)} loading={false}>
          <PlusCircleOutlined />
          <span style={{ fontSize: '16px' }}>Add Device</span>
        </Button>
      </Row>
      {console.log('columns', locations)}
      <div className="pt-10 pb-10 h-full">
        {isLoading ? <Skeleton active />
          : <Table dataSource={locations} columns={columns} />}
      </div>
      {isOpenScreenModal && (
      <AddScreenGeoModal
        open={isOpenScreenModal}
        onCancel={() => setIsOpenScreenModal(false)}
        handleOnSubmit={handleAddScreenLocation}
        loading={isLoading}
        recordData={recordToEdit}
        venueCatalogData={venueCatalogData}
      />
      )}
    </div>
  );
}
