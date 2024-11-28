import React, { useState } from 'react';
import {
  Button, message,
  Row,
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

function CampaignLaunchSave(props) {
  const {
    stepNumber, headerTitle, subHeaderTitle, buttonTitle = 'Save & Exit', campaignBudget,
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

    <Row className="justify-between">
      <div className="flex gap-10">
        <div className="page-header flex items-center" style={{ color: 'gray' }}>
          {stepNumber}
          /5
        </div>
        <div>
          <div className="page-header" style={{ lineHeight: '18px' }}>
            {headerTitle}
          </div>
          <div>
            {subHeaderTitle}
          </div>
        </div>
      </div>
      <div className="flex flex-row" style={{ gap: '10px' }}>

        <Button
          type="primary"
          size="large"
          onClick={handleNextButton}
          loading={isLoading}
          disabled={isLoading || newCampaign?.isLaunched}
        >
          <span style={{ fontSize: '16px' }}>{buttonTitle}</span>
        </Button>
      </div>
    </Row>
  );
}

export default CampaignLaunchSave;
