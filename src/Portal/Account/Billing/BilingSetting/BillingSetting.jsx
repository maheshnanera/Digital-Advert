import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Tabs } from 'antd';
import BillingSettingHeader from './BillingSettingHeader';
import EditBillingInfoModal from './EditBillingInfoModal';
import { setOpenAddCardModal, setOpenBillingModal, setOrganization } from '../../../../store/slices/portalSlice';
import '../Billing.css';
import AddCardModal from './AddCardModal';
import { UpdateOrganization } from '../../../../User/UserActions';
import BillingPage from './BillingPage';
import CardPage from './CardPage';
import NoCardState from './NoCardState';

// Replace with your Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const { TabPane } = Tabs;
function BillingSetting() {
  const dispatch = useDispatch();
  const { organization, openBillingModal, openAddCardModal } = useSelector((state) => state.portal);

  const [tabKey, setTabKey] = useState('1');
  const [loading, setLoading] = useState(false);

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
  };

  const handleBillingModalCancel = () => {
    dispatch(setOpenBillingModal(false));
  };

  const handleCardModalCancel = () => {
    dispatch(setOpenAddCardModal(false));
  };

  const handleTabChange = (value) => {
    setTabKey(value);
  };
  const handleSubmit = () => {
    dispatch(setOpenAddCardModal(true));
  };

  return (
    <div className="flex flexColumn h-full">
      <BillingSettingHeader tabValue={tabKey} />

      <Tabs defaultActiveKey={tabKey} onChange={handleTabChange}>
        <TabPane tab="Payment Method" key="1">
          {organization?.cardLastDigit && <CardPage />}
          {!organization?.cardLastDigit
          && <NoCardState handleSubmit={handleSubmit} />}
        </TabPane>
        <TabPane tab="Billing Info" key="2">
          <BillingPage />
        </TabPane>
      </Tabs>
      {openBillingModal
        && (
        <EditBillingInfoModal
          onCancel={handleBillingModalCancel}
          onUpdateInfo={handleUpdateBillingInfo}
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
    </div>
  );
}

export default BillingSetting;
