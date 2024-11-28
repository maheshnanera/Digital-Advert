import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GlobalHeaderForSaveAndExit from '../../ReUsableComponent/GlobalHeaderForSaveAndExit';
import GlobalFooterForContinue from '../../ReUsableComponent/GlobalFooterForContinue';
import CampaignCatalogSection from './CampaignCatalogSection';
import { ListVenueCatalogItems } from '../../User/UserActions';
import { GetFileFromS3 } from '../../ReUsableFunctions/UploadFile';
import { updateCampaignFields } from '../../ReUsableFunctions/ReUsableFunction';
import { setNewCampaign } from '../../store/slices/campaignSlice';

function CampaignCatalogsView() {
  const { newCampaign } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();

  const [venueCatalogData, setVenueCatalogData] = useState([]);
  const [venueCatalogItemsArray, setVenueCatalogItemsArray] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const history = useHistory();

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

  const fetchVenueCataLogItemsForOrg = async () => {
    setIsDataLoading(true);
    const data = await ListVenueCatalogItems();
    const dataWithImage = await getPhotoURLsFromS3(data?.items);
    setIsDataLoading(false);
    setVenueCatalogData(dataWithImage || []);
  };

  useEffect(() => {
    fetchVenueCataLogItemsForOrg();
  }, []);

  const handleNextStep = async () => {
    if (venueCatalogItemsArray.length > 0) {
      const newData = await updateCampaignFields(newCampaign, 'targetVenues', venueCatalogItemsArray, 'VENUE_TYPES');
      dispatch(setNewCampaign(newData));
    }
    history.push(`/campaign/${newCampaign?.id}/timings`);
  };

  const handleSaveExit = async () => {
    if (venueCatalogItemsArray.length > 0) {
      updateCampaignFields(newCampaign, 'targetVenues', venueCatalogItemsArray, 'VENUE_TYPES');
      dispatch(setNewCampaign(null));
    }
    history.push('/');
  };

  const handleGoBack = () => {
    history.push(`/campaign/${newCampaign?.id}/screen`);
    // history.goBack();
  };

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <GlobalHeaderForSaveAndExit stepNumber={2} headerTitle="Venues Types" subHeaderTitle="Please select venues where you want to show the campaign" handelSaveExit={handleSaveExit} />
      <CampaignCatalogSection
        venueCataLogData={venueCatalogData}
        isLoading={isDataLoading}
        setVenueCatalogItemsArray={setVenueCatalogItemsArray}
        venueCatalogItemsArray={venueCatalogItemsArray}
      />
      <GlobalFooterForContinue
        handleNextButton={handleNextStep}
        handleCancelButton={handleGoBack}
      />
    </Layout>

  );
}

export default CampaignCatalogsView;
