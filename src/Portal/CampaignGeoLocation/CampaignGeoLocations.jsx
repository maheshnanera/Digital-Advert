/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import GeoMap from './GeoMap';
import GeoSearchBar from './GeoSearchBar';
import { ListScreenGeoLocation, openSearchGetGeoJsonByName } from '../../User/UserActions';
import GlobalFooterForContinue from '../../ReUsableComponent/GlobalFooterForContinue';
import GlobalHeaderForSaveAndExit from '../../ReUsableComponent/GlobalHeaderForSaveAndExit';
import { updateCampaignFields } from '../../ReUsableFunctions/ReUsableFunction';
import { setNewCampaign } from '../../store/slices/campaignSlice';

function CampaignGeoLocations() {
  const [geoData, setGeoData] = useState({});
  const [geoScreenLocations, setGeoScreenLocations] = useState([]);
  const { newCampaign } = useSelector((state) => state.campaign);
  const history = useHistory();
  const dispatch = useDispatch();

  const getGeoJsonForCity = async (citys) => {
    if (citys.length > 0) {
      const createDynamicFilter = (cityNames) => ({
        or: cityNames.map((city) => ({ NAME_3: { eq: city } })),
      });
      const filter = createDynamicFilter(citys);
      const { data } = await openSearchGetGeoJsonByName(filter);
      setGeoData(data?.searchProperties?.items);
    } else {
      setGeoData([]);
    }
  };

  const fetchScreenLocations = async () => {
    const data = await ListScreenGeoLocation();
    setGeoScreenLocations(data?.items || []);
  };
  useEffect(() => {
    fetchScreenLocations();
  }, []);

  const handleNextStep = async () => {
    if (geoData && Array.isArray(geoData) && geoData.length > 0) {
      const geoDataIds = geoData.map((item) => item.id).filter(Boolean);
      if (geoDataIds.length > 0) {
        const newData = await updateCampaignFields(newCampaign, 'targetCities', geoDataIds, 'GEO_LOCATION');
        dispatch(setNewCampaign(newData));
      }
    }
    history.push(`/campaign/${newCampaign?.id}/catalogs`);
  };

  const handleSaveExit = async () => {
    if (geoData && Array.isArray(geoData) && geoData.length > 0) {
      const geoDataIds = geoData.map((item) => item.id).filter(Boolean);
      if (geoDataIds.length > 0) {
        updateCampaignFields(newCampaign, 'targetCities', geoDataIds, 'GEO_LOCATION');
        dispatch(setNewCampaign(null));
      }
    }
    history.push('/');
  };

  return (
    <>
      <Layout style={{ backgroundColor: 'white' }}>
        <GlobalHeaderForSaveAndExit handelSaveExit={handleSaveExit} stepNumber={1} headerTitle="Geo Locating" subHeaderTitle="Select the cities to run the campaign" />
        <GeoSearchBar handleChange={getGeoJsonForCity} />
        <GeoMap geoJSONData={geoData} geoScreenLocations={geoScreenLocations} />
        <GlobalFooterForContinue handleNextButton={handleNextStep} hideBackButton />
      </Layout>
    </>
  );
}

export default CampaignGeoLocations;
