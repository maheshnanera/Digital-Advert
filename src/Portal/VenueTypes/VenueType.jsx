import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Row, Skeleton } from 'antd';
import AddVenuePresetModal from './Components/AddVenuePresetModal';
import { CreateVenuePreset, ListVenueCatalogItems } from '../../User/UserActions';
import VenueCatalog from './Components/VenueCatalog';
import { GetFileFromS3 } from '../../ReUsableFunctions/UploadFile';

function VenueType() {
  const [isOpenPresetModal, setIsOpenPresetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [venueCatalogData, setVenueCatalogData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const getPhotoURLsFromS3 = async (data) => {
    const updatedData = await Promise.all(
      data.map(async (venueType) => {
        const venues = await Promise.all(
          venueType.venueCatalogItems.items.map(async (item) => {
            if (item?.thumbnail) {
              const photoURL = await GetFileFromS3(item?.thumbnail);
              return {
                ...item,
                image: photoURL.url,
              };
            }
            return item;
          }),
        );
        return {
          ...venueType,
          venueCatalogItems: {
            ...venueType.venueCatalogItems,
            items: venues,
          },
        };
      }),
    );
    return updatedData;
  };

  const fetchVenueCataLogItems = async () => {
    setIsDataLoading(true);
    const data = await ListVenueCatalogItems();
    const dataWithImage = await getPhotoURLsFromS3(data?.items);
    setIsDataLoading(false);
    setVenueCatalogData(dataWithImage || []);
  };

  useEffect(() => {
    fetchVenueCataLogItems();
  }, []);

  //  this is for the add screen for the country
  const handleAddVenuePresetName = async (formValues) => {
    setIsLoading(true);
    const { presetName } = formValues;
    const inputData = {
      venuePrsetName: presetName,
    };
    await CreateVenuePreset(inputData);
    fetchVenueCataLogItems();
    setIsOpenPresetModal(false);
    setIsLoading(false);
  };

  return (
    <div className="flex flexColumn h-full">
      <Row className="justify-between">
        <div className="page-header">Venue Catalog</div>
        <Button type="primary" size="large" onClick={() => setIsOpenPresetModal(true)} loading={false}>
          <PlusCircleOutlined />
          <span style={{ fontSize: '16px' }}>Add Venue Preset</span>
        </Button>
      </Row>

      {!isDataLoading
        ? (
          <VenueCatalog
            venueCatalogData={venueCatalogData}
            fatCatalogData={fetchVenueCataLogItems}
          />
        )
        : (
          <Skeleton active />
        )}

      {isOpenPresetModal && (
      <AddVenuePresetModal
        open={isOpenPresetModal}
        onCancel={() => setIsOpenPresetModal(false)}
        handleOnSubmit={handleAddVenuePresetName}
        loading={isLoading}
      />
      )}
    </div>
  );
}

export default VenueType;
