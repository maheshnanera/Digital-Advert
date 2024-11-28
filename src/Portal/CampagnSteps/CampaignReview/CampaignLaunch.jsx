import React, { useState } from 'react';
import {
  Layout, Button, Tooltip, message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  useStripe,
} from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setOpenAddCardModal, setOpenBillingModal } from '../../../store/slices/portalSlice';
import { RESTPost } from '../../../Utils/RestApi';
import { UpdateCampaign } from '../../../User/UserActions';

function CampaignLaunch(props) {
  const { Footer } = Layout;
  const {
    handleCancelButton, className, hideBackButton, shouldNotContinue,
    nextTitle = 'Next', campaignBudget,
  } = props;

  const { newCampaign } = useSelector((state) => state.campaign);
  const { currentUser } = useSelector((state) => state.loginReducer);
  const { organization } = useSelector((state) => state.portal);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const stripe = useStripe();

  const handleNextButton = async () => {
    if (!organization?.address) {
      dispatch(setOpenBillingModal(true));
      return;
    }
    if (!organization?.paymentMethodId && organization?.address) {
      dispatch(setOpenAddCardModal(true));
      return;
    }
    setIsLoading(true);
    const inputDataForRest = {
      paying_amount: campaignBudget,
      organization_id: organization?.id,
      campaign_id: newCampaign?.id,
      payment_method_id: organization?.paymentMethodId,
      currency: organization?.currency,
      customer_email: currentUser.email,
      address: organization?.address,
      country: organization?.country,
      postal_code: organization?.postalCode,
      stripe_customer_id: organization?.stripeCustomerId || null,
    };
    const restOperation = await RESTPost('/create-payment-intent', inputDataForRest);
    const { body } = await restOperation.response;
    // eslint-disable-next-line camelcase
    const { client_secret } = await body.json();

    const confirmPaymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: organization?.paymentMethodId,
    });

    if (confirmPaymentResult.error) {
      message.error('Error confirming payment:', confirmPaymentResult.error);
      return;
    }
    message.success('Payment confirmed');
    const inputDataNew = {
      transactionDateTime: dayjs.unix(confirmPaymentResult.paymentIntent.created).toISOString(),
      isLaunched: true,
      id: newCampaign.id,
    };
    await UpdateCampaign(inputDataNew);

    setIsLoading(false);
    message.success('Campaign launch successfully');
    history.push('/');
  };

  return (
    <Footer
      style={{
        display: 'flex', justifyContent: 'space-between', padding: '8px', zIndex: 1,
      }}
      className={className}
    >
      {!hideBackButton ? (
        <Button
          style={{ width: '128px', height: '40px' }}
          type="basic"
          onClick={handleCancelButton}
          loading={isLoading}
          disabled={isLoading || newCampaign?.isLaunched}
        >
          Back
        </Button>
      ) : <div />}
      <Tooltip title={shouldNotContinue || ''}>
        <Button type="primary" loading={isLoading} disabled={isLoading || newCampaign?.isLaunched} style={{ width: '170px', height: '40px' }} onClick={handleNextButton}>{nextTitle}</Button>
      </Tooltip>
    </Footer>
  );
}

export default CampaignLaunch;
