/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Collapse, Table, Button, Avatar, Space, Popconfirm,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import AddVenueCatalogItem from './AddVenueCatalogItem';
import { CreateVenueCatalogItem, DeleteVenueCatalogItem, DeleteVenuePreset } from '../../../User/UserActions';
import { deleteFileFromS3, uploadFileToS3 } from '../../../ReUsableFunctions/UploadFile';

const { Panel } = Collapse;

function VenueCatalog(props) {
  const { venueCatalogData, fatCatalogData } = props;

  const [isVenueCatalogModalOpen, setIsVenueCatalogModalOpen] = useState(false);
  const [venuePresetID, setVenuePresetID] = useState(null);
  const [fileList, setFileList] = useState(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const handleAddVenueCatalogItem = (id) => {
    setVenuePresetID(id);
    setIsVenueCatalogModalOpen(true);
  };

  const handleModalOk = async (values) => {
    setIsLoadingCreate(true);
    const { name, description } = values;

    const res = await uploadFileToS3(fileList[0].originFileObj);
    const inputData = {
      description,
      thumbnail: res?.key,
      venueItemName: name,
      venueCatalogID: venuePresetID,
    };
    await CreateVenueCatalogItem(inputData);
    await fatCatalogData();
    setIsLoadingCreate(false);
    setIsVenueCatalogModalOpen(false);
  };

  const handleDeleteVenueCatalog = async (record) => {
    deleteFileFromS3(record.thumbnail);
    await DeleteVenueCatalogItem(record.id);
    fatCatalogData();
  };

  const columns = [
    {
      title: 'Photo',
      width: '20%',
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
      width: '30%',
      dataIndex: 'venueItemName',
    },
    {
      title: 'Description',
      width: '40%',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDeleteVenueCatalog(record)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDeleteVenuePreset = async (record) => {
    if (record?.venueCatalogItems?.items?.length > 0) {
      const deletePromises = record?.venueCatalogItems?.items.map((item) => {
        deleteFileFromS3(item.thumbnail);
      });
      await Promise.all(deletePromises);
    }
    await DeleteVenuePreset(record.id);
    fatCatalogData();
  };

  return (
    <>
      <Collapse defaultActiveKey={['0']} style={{ marginTop: '20px' }}>
        {venueCatalogData?.length > 0 && venueCatalogData.map((venueType, index) => (
          <Panel
            header={venueType?.venuePrsetName}
            key={index}
            style={{ marginBottom: '5px' }}
            extra={(
              <Popconfirm
                title="Are you sure to delete this venue type?"
                onConfirm={() => handleDeleteVenuePreset(venueType)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="text"
                  onClick={(e) => e.stopPropagation()} // Prevents collapse panel from toggling
                />
              </Popconfirm>
            )}
          >
            <div key={index}>
              <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => handleAddVenueCatalogItem(venueType.id)}>
                Add Venue Catalog Item
              </Button>
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
      {isVenueCatalogModalOpen
        && (
        <AddVenueCatalogItem
          isModalOpen={isVenueCatalogModalOpen}
          handleModalOk={handleModalOk}
          handleModalCancel={() => setIsVenueCatalogModalOpen(false)}
          setFileList={setFileList}
          isCreateLoading={isLoadingCreate}
          fileList={fileList}
        />
        )}
    </>
  );
}

export default VenueCatalog;
