/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FullPageLayout from '../MainLayout/FullPageLayout';

function PublicLayoutRoute(props) {
  const { render, ...rest } = props;

  const { accessToken } = useSelector(
    (state) => state.loginReducer,
  );

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <>
          {accessToken && (
          <Redirect from={matchProps.path} to="/" />
          )}

          {!accessToken
         && <FullPageLayout>{render(matchProps)}</FullPageLayout>}
        </>
      )}
    />
  );
}

export default PublicLayoutRoute;
