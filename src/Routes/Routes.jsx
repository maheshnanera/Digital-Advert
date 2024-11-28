/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from '../User/Login/Login';
import PublicLayoutRoute from './PublicLayoutRoute';
import MainLayoutRoute from './MainLayoutRoute';
import Dashboard from '../Portal/Dashboard/Dashboard';
import Members from '../Portal/Account/Members/Members';
import CreateAccount from '../User/CreateAccount/CreateAccount';
import ConfirmEmail from '../User/CreateAccount/ConfirmEmail';
import ForgetPassword from '../User/ForgetPassword/ForgetPassword';
import ConfirmPassword from '../User/ForgetPassword/ConfirmPassword';
import CreatePassword from '../User/Login/CreatePassword';
import Organization from '../Portal/Account/Organization/Organization';
import Settings from '../Portal/Account/UserSetting/Settings';
import Location from '../Portal/GeoLocations/Location';
import CampaignGeoLocations from '../Portal/CampaignGeoLocation/CampaignGeoLocations';
import VenueType from '../Portal/VenueTypes/VenueType';
import MediaGallery from '../Portal/Gallery/MediaGallery';
import CampaignCatalogsView from '../Portal/CamapaignCatalogsView/CampaignCatalogsView';
import CampaignTiming from '../Portal/CampagnSteps/CampaignTimings/CampaignTiming';
import CampaignMedia from '../Portal/CampagnSteps/CampaingMedias/CampaignMedia';
import BillingSetting from '../Portal/Account/Billing/BilingSetting/BillingSetting';
import ReviewCampaign from '../Portal/CampagnSteps/CampaignReview/ReviewCampaign';

export default function Routes() {
  return (
    <BrowserRouter basename="/" history={createBrowserHistory()}>
      <Switch>
        <PublicLayoutRoute
          exact
          path="/login"
          render={(matchprops) => <Login {...matchprops} />}
        />
        <PublicLayoutRoute
          exact
          path="/signup"
          render={(matchprops) => <CreateAccount {...matchprops} />}
        />
        <PublicLayoutRoute
          exact
          path="/confirm_sign_up"
          render={(matchprops) => <ConfirmEmail {...matchprops} />}
        />
        <PublicLayoutRoute
          exact
          path="/confirm_sign_up?confirmationcode=:code"
          render={(matchprops) => <ConfirmEmail {...matchprops} />}
        />
        <PublicLayoutRoute
          exact
          path="/forgot-password"
          render={(matchprops) => <ForgetPassword {...matchprops} />}
        />
        <PublicLayoutRoute
          exact
          path="/reset-password"
          render={(matchprops) => <ConfirmPassword {...matchprops} />}
        />
        <PublicLayoutRoute
          exact
          path="/reset-password?confirmationcode=:code+email=:email"
          render={(matchprops) => <ConfirmPassword {...matchprops} />}
        />
        <PublicLayoutRoute
          exact
          path="/create-password"
          render={(matchprops) => <CreatePassword {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/"
          render={(matchprops) => <Dashboard {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/gallery"
          render={(matchprops) => <MediaGallery {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/campaign/:id/screen"
          render={(matchprops) => <CampaignGeoLocations {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/campaign/:id/catalogs"
          render={(matchprops) => <CampaignCatalogsView {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/campaign/:id/timings"
          render={(matchprops) => <CampaignTiming {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/campaign/:id/media"
          render={(matchprops) => <CampaignMedia {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/campaign/:id/review"
          render={(matchprops) => <ReviewCampaign {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/location"
          render={(matchprops) => <Location {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/venues"
          render={(matchprops) => <VenueType {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/account/profile"
          render={(matchprops) => <Settings {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/account/members"
          render={(matchprops) => <Members {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/account/billing"
          render={(matchprops) => <BillingSetting {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/account/billing/setting"
          render={(matchprops) => <BillingSetting {...matchprops} />}
        />
        <MainLayoutRoute
          exact
          path="/account/orgs"
          render={(matchprops) => <Organization {...matchprops} />}
        />

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
