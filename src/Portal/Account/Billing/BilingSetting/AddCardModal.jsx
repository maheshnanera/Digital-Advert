/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo, useState } from 'react';
import { Modal, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { setOpenAddCardModal, setOrganization } from '../../../../store/slices/portalSlice';
import { UpdateOrganization } from '../../../../User/UserActions';

function AddCardModal(props) {
  const { onCancel, isLoading, setLoading } = props;
  const { openAddCardModal, organization } = useSelector((state) => state.portal);
  const [cardHolder, setCardHolder] = useState('');
  const dispatch = useDispatch();

  const useOptions = () => {
    const fontSize = '12px';
    const options = useMemo(
      () => ({
        style: {
          base: {
            fontSize,
            color: '#424770',
            letterSpacing: '0.025em',
            fontFamily: 'Source Code Pro, monospace',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }),
      [fontSize],
    );

    return options;
  };

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      message.error('Something went wrong');
      return;
    }
    if (!organization?.address
      || !organization?.city
       || !organization?.postalCode
        || !organization?.country) {
      message.error('Please set billing info first');
      return;
    }
    setLoading(true);
    const cardDetail = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: cardHolder, // Replace with actual customer name
        address: {
          line1: organization?.address,
          city: organization?.city,
          postal_code: organization?.postalCode,
          country: organization?.country,
        },
      },
    });

    //  Live mode should be true
    if (cardDetail.error) {
      message.error('Something went wrong! Please check your card details.');
    } else {
      setLoading(true);

      const datToUpdate = {
        paymentMethodId: cardDetail?.paymentMethod?.id,
        cardLastDigit: cardDetail?.paymentMethod?.card?.last4,
        accountHolderName: cardHolder,
        cardCompanyName: cardDetail?.paymentMethod?.card?.display_brand,
      };
      const inputData = {
        ...datToUpdate,
        id: organization.id,
      };
      await UpdateOrganization(inputData);

      setLoading(false);
      dispatch(setOrganization({ ...organization, ...datToUpdate }));
      dispatch(setOpenAddCardModal(false));
    }
  };

  return (
    <Modal
      open={openAddCardModal}
      title="New payment method"
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} loading={isLoading} disabled={isLoading}>
          Save
        </Button>,
      ]}
      onCancel={onCancel}
    >
      <form onSubmit={handleSubmit} className="stripeClassCss">
        <label>
          Card number
          <CardNumberElement
            options={options}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            options={options}
          />
        </label>
        <label>
          CVC
          <CardCvcElement
            options={options}
          />
        </label>
        <label>
          Card Holder
          <input
            style={{ width: '472px' }}
            options={options}
            placeholder="John week"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
          />
        </label>
      </form>

    </Modal>
  );
}

export default AddCardModal;
