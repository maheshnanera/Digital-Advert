/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';

export default function MainLayoutRoute(props) {
  const { render, ...rest } = props;
  const { accessToken } = useSelector(
    (state) => state.loginReducer,
  );
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <>
          {!accessToken && <Redirect from={matchProps.path} to="/login" />}
          {accessToken && <MainLayout>{render(matchProps)}</MainLayout>}
        </>
      )}
    />
  );
}
