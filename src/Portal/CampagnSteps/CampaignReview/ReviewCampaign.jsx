import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Layout } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import ReviewCampaignPage from './ReviewCampaignPage';
import {
  ListMediaContentActionCustom, ListVenueCatalogItemsDataCustom, UpdateOrganization,
} from '../../../User/UserActions';
import { GetFileFromS3 } from '../../../ReUsableFunctions/UploadFile';
import EditBillingInfoModal from '../../Account/Billing/BilingSetting/EditBillingInfoModal';
import AddCardModal from '../../Account/Billing/BilingSetting/AddCardModal';
import { setOpenAddCardModal, setOpenBillingModal, setOrganization } from '../../../store/slices/portalSlice';
import CampaignLaunch from './CampaignLaunch';
import CampaignLaunchSave from './CampaignLaunchSave';

function ReviewCampaign() {
  const { newCampaign } = useSelector((state) => state.campaign);
  const { organization, openBillingModal, openAddCardModal } = useSelector((state) => state.portal);
  const dispatch = useDispatch();

  const history = useHistory();
  const [isVenueDataLoading, setIsVenueDataLoading] = useState(false);
  const [mediaContent, setMediaContent] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [venueItemData, setVenueItemData] = useState(false);
  const [loading, setLoading] = useState(false);

  // Replace with your Stripe public key
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

  const getPhotoURLsFromS3 = async (data) => {
    const allVenueCatalogItems = [];

    await Promise.all(
      data.map(async (venueItem) => {
        const updatedItem = { ...venueItem };
        if (venueItem?.thumbnail) {
          const photoURL = await GetFileFromS3(venueItem.thumbnail);
          updatedItem.image = photoURL.url;
        }
        allVenueCatalogItems.push(updatedItem);
        return updatedItem;
      }),
    );
    return allVenueCatalogItems;
  };

  const fetchVenueCataLogItems = async () => {
    setIsVenueDataLoading(true);
    const createDynamicFilter = (ids) => (
      {
        or: ids.map((id) => ({ id: { eq: id } })),
      });
    const filter = createDynamicFilter(newCampaign.targetVenues);
    const data = await ListVenueCatalogItemsDataCustom(filter);
    const dataWithImage = await getPhotoURLsFromS3(data?.items);
    setIsVenueDataLoading(false);
    setVenueItemData(dataWithImage);
  };

  const fetchOrgMedias = async () => {
    setIsMediaLoading(true);
    const createDynamicFilter = (ids) => (
      {
        or: ids.map((id) => ({ id: { eq: id } })),
      });
    const filter = createDynamicFilter(newCampaign.targetMediaContents);
    const data = await ListMediaContentActionCustom(filter);
    const dataWithImage = await getPhotoURLsFromS3(data?.items);
    setIsMediaLoading(false);
    setMediaContent(dataWithImage);
  };

  useEffect(() => {
    fetchVenueCataLogItems();
    fetchOrgMedias();
  }, []);

  const handleGoBack = () => {
    history.push(`/campaign/${newCampaign?.id}/media`);
    // history.goBack();
  };

  const totalCampaignBudget = () => {
    const startDate = new Date(newCampaign?.startTime);
    const endDate = new Date(newCampaign?.endTime);
    const differenceInMs = endDate - startDate;
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24) + 1;
    const totalDays = Math.round(differenceInDays);
    return totalDays * 50;
  };

  //  Billing
  const handleUpdateBillingInfo = async (values) => {
    dispatch(setOpenBillingModal(false));
    const datToUpdate = {
      country: values.country,
      currency: values.currency,
      billingLanguage: values.billingLanguage,
      companyName: values.companyName,
      VATNumber: values.VATNumber,
      address: values.address,
      postalCode: values.postalCode,
      city: values.city,
    };
    const inputData = {
      ...datToUpdate,
      id: organization.id,
    };
    await UpdateOrganization(inputData);
    dispatch(setOrganization({ ...organization, ...datToUpdate }));
    dispatch(setOpenBillingModal(false));
    if (!organization?.paymentMethodId && datToUpdate?.address) {
      dispatch(setOpenAddCardModal(true));
    }
  };

  const handleBillingModalCancel = () => {
    dispatch(setOpenBillingModal(false));
  };

  const handleCardModalCancel = () => {
    dispatch(setOpenAddCardModal(false));
  };
  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Elements stripe={stripePromise}>
        <CampaignLaunchSave buttonTitle="Launch Campaign" stepNumber={5} headerTitle="Review your campaign" subHeaderTitle="You’ve done it. Your campaign is all set up and ready to go" />
      </Elements>
      <ReviewCampaignPage
        campaignVenus={venueItemData}
        isVenueLoading={isVenueDataLoading}
        isMediaLoading={isMediaLoading}
        mediaContentData={mediaContent}
        campaignBudget={totalCampaignBudget()}
      />
      <Elements stripe={stripePromise}>
        <CampaignLaunch
          handleCancelButton={handleGoBack}
          nextTitle="Launch Campaign"
          campaignBudget={totalCampaignBudget()}
        />
      </Elements>
      {openBillingModal
        && (
        <EditBillingInfoModal
          onCancel={handleBillingModalCancel}
          onUpdateInfo={handleUpdateBillingInfo}
          fromCampaignReview
        />
        )}
      {openAddCardModal
        && (
        <Elements stripe={stripePromise}>
          <AddCardModal
            onCancel={handleCardModalCancel}
            isLoading={loading}
            setLoading={setLoading}
          />
        </Elements>
        )}
    </Layout>

  );
}

export default ReviewCampaign;
