import React, { useState } from 'react';
import { Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GlobalHeaderForSaveAndExit from '../../../ReUsableComponent/GlobalHeaderForSaveAndExit';
import GlobalFooterForContinue from '../../../ReUsableComponent/GlobalFooterForContinue';
import DateRangePickerCustom from './DateRangePickerCustom';
import { updateCampaignDateFields } from '../../../ReUsableFunctions/ReUsableFunction';
import { setNewCampaign } from '../../../store/slices/campaignSlice';

function CampaignTiming() {
  const [selectedDate, setSelectedDate] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { newCampaign } = useSelector((state) => state.campaign);

  const handleNextStep = async () => {
    const newData = await updateCampaignDateFields(newCampaign, selectedDate[0], selectedDate[1], 'TIME');
    dispatch(setNewCampaign(newData));
    history.push(`/campaign/${newCampaign?.id}/media`);
  };
  const handleGoBack = () => {
    history.push(`/campaign/${newCampaign?.id}/catalogs`);
    // history.goBack();
  };

  const handleSaveExit = async () => {
    updateCampaignDateFields(newCampaign, selectedDate[0], selectedDate[1], 'TIME');
    dispatch(setNewCampaign(null));
    history.push('/');
  };

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <GlobalHeaderForSaveAndExit handelSaveExit={handleSaveExit} stepNumber={3} headerTitle="Timing" subHeaderTitle="Please select the time period to run the campaign" />
      <DateRangePickerCustom selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <GlobalFooterForContinue handleNextButton={handleNextStep} handleCancelButton={handleGoBack} className="timingFooter" shouldNotContinue={selectedDate?.length > 0 ? '' : 'Please select date range'} />
    </Layout>
  );
}

export default CampaignTiming;
