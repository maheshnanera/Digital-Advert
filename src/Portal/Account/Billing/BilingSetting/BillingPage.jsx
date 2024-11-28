import {
  BankFilled, EnvironmentFilled, SettingFilled,
} from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';

function BillingPage() {
  const { organization } = useSelector((state) => state.portal);

  return (
    <div className="flex flexColumn" style={{ gap: '10px' }}>
      <div className="flex flexRow" style={{ gap: '10px' }}>
        <EnvironmentFilled style={{ fontSize: '20px' }} />
        Address :
        {' '}
        {organization.address}
      </div>
      <div className="flex flex-row" style={{ gap: '10px' }}>
        <BankFilled style={{ fontSize: '20px' }} />
        Country :
        {' '}
        {organization.country}
      </div>
      <div className="flex flex-row" style={{ gap: '10px' }}>
        <BankFilled style={{ fontSize: '20px' }} />
        City :
        {' '}
        {organization.city}
      </div>
      <div className="flex flex-row" style={{ gap: '10px' }}>
        <SettingFilled style={{ fontSize: '20px' }} />
        Language :
        {' '}
        {organization.billingLanguage}
      </div>

    </div>
  );
}

export default BillingPage;
