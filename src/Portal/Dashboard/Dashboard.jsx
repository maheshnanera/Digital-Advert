/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import './dashboard.css';
import debounce from 'lodash/debounce';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { message, Skeleton } from 'antd';
import DashboardHeader from './Components/DashboardHeader';
import DashboardSubHeader from './Components/DashboardSubHeader';
import DashboardZeroState from './Components/DashboardZeroState';
import { setOrganization } from '../../store/slices/portalSlice';
import {
  CreateCampaign, DeleteCampaign,
  ListCampaignsCustom, getOrganizationByUserCustom, openSearchCampaignByName,
} from '../../User/UserActions';
import JoinOrgModal from '../../ReUsableComponent/Organization/JoinOrgModal';
import NewCampaignModal from './Components/NewCampaignModal';
import { setAllCampaign, setNewCampaign, setOpenNewCampaignModal } from '../../store/slices/campaignSlice';
import CampaignsCard from './Components/CampaignsCard';
import { setUserOrganizations } from '../../store/slices/orgSlice';
import { CAMPAIGN_STATUS } from '../../Utils/constants';

const PAGE_SIZE = 15;

export default function Dashboard() {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.loginReducer);
  const {
    openNewCampaignModal, allCampaign, campaignSearchQuery, campaignFilterType,
  } = useSelector((state) => state.campaign);

  const { organization } = useSelector((state) => state.portal);
  const [isNewCampaignLoading, setIsNewCampaignLoading] = useState(false);
  const [loadingMoreResult, setLoadingMoreResult] = useState(false);
  const [mediaNextToken, setMediaNextToken] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(true);

  // This will fetch all campaign for org
  const fetchOrgCampaigns = async (org = organization, nextTokenToUse = null) => {
    setIsDataLoading(true);
    const orgID = organization?.id || org?.id;
    if (!orgID) {
      return;
    }
    const filter = {
      organizationID: {
        eq: orgID,
      },
    };
    const limit = PAGE_SIZE;
    const data = await ListCampaignsCustom(filter, limit, nextTokenToUse);
    setMediaNextToken(data.nextToken);
    setLoadingMoreResult(false);
    if (nextTokenToUse) {
      dispatch(setAllCampaign([...allCampaign, ...data?.items]));
    } else {
      dispatch(setAllCampaign(data?.items));
    }
    setIsDataLoading(false);
  };

  const fetchOrgDetail = async () => {
    const data = await getOrganizationByUserCustom(currentUser.sub);
    // Add condition to set the role = Root to org
    const rootIndex = data?.items?.findIndex((item) => item?.role === 'ROOT');
    const orgData = rootIndex !== -1
      ? data.items[rootIndex].organization : data.items[0].organization;
    dispatch(setOrganization(orgData));
    dispatch(setUserOrganizations(data?.items));
    fetchOrgCampaigns(orgData);
  };

  useEffect(() => {
    fetchOrgDetail();
  }, []);

  const handleScroll = useCallback(() => {
    const clientHeight = window.innerHeight;
    const { scrollTop } = document.documentElement;
    const scrollHeight = document.documentElement.offsetHeight;

    if (scrollTop + clientHeight >= scrollHeight && mediaNextToken && !loadingMoreResult) {
      setLoadingMoreResult(true);
      fetchOrgCampaigns(null, mediaNextToken);
    }
  }, [mediaNextToken, loadingMoreResult, allCampaign]);

  useLayoutEffect(() => {
    const tableRef = containerRef.current;
    if (tableRef) {
      tableRef.addEventListener('scroll', handleScroll);
      return () => {
        tableRef.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const handleCreateOrgStep1 = async (value) => {
    setIsNewCampaignLoading(true);
    const inputData = {
      ...value,
      editGroups: organization?.editGroups,
      fullGroups: organization?.fullGroups,
      organizationID: organization?.id,
      readGroups: organization?.readGroups,
      status: 'CAMPAIGN',
    };
    const data = await CreateCampaign(inputData);
    fetchOrgCampaigns();
    dispatch(setNewCampaign(data));
    history.push(`/campaign/${data?.id}/screen`);
    setIsNewCampaignLoading(false);
    dispatch(setOpenNewCampaignModal(false));
  };

  const handleDeleteCampaign = async (campaignToDelete) => {
    await DeleteCampaign(campaignToDelete?.id);
    fetchOrgCampaigns();
    message.success('Campaign Deleted Successfully');
  };

  const handleCampaignCardClick = async (campaignDetail) => {
    console.log('campaignDetail', campaignDetail.status, CAMPAIGN_STATUS[campaignDetail?.status]);
    const pathToRedirect = campaignDetail?.status ? CAMPAIGN_STATUS[campaignDetail?.status] : 'screen';
    console.log('pathToRedirect', pathToRedirect);
    dispatch(setNewCampaign(campaignDetail));
    history.push(`/campaign/${campaignDetail?.id}/${pathToRedirect}`);
  };

  const filteredCampaigns = allCampaign?.length > 0 && allCampaign
    ?.filter((campaign) => {
      const { CampaignName } = campaign;
      if (campaignSearchQuery) {
        return CampaignName.toLowerCase().includes(campaignSearchQuery.toLowerCase());
      }
      return true;
    })
    ?.sort((a, b) => {
      if (campaignFilterType === 'title') {
        return a.CampaignName.localeCompare(b.CampaignName);
      } if (campaignFilterType === 'status') {
        return a?.status?.localeCompare(b.status);
      }
      return 0;
    });

  const debouncedFetchCities = useCallback(
    debounce(async () => {
      try {
        const filter = {
          CampaignName:
            { wildcard: `*${campaignSearchQuery.toLowerCase()}*` },
          organizationID: {
            eq: organization?.id,
          },
        };
        const response = await openSearchCampaignByName(filter);
        dispatch(setAllCampaign(response?.items));
        console.log('response', response);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }, 300),
    [campaignSearchQuery],
  );

  useEffect(() => {
    if (campaignSearchQuery && campaignSearchQuery !== '') {
      debouncedFetchCities();
    } else if (Object.keys(organization)?.length > 0) {
      fetchOrgCampaigns();
    }
  }, [campaignSearchQuery]);

  return (
    <div className="flex flexColumn h-full">
      <DashboardHeader />

      <div className="pt-10 pb-10 h-full">
        <DashboardSubHeader />
        {!filteredCampaigns && !isDataLoading && <DashboardZeroState />}
        <JoinOrgModal />
        {filteredCampaigns && !isDataLoading
          && (
          <div style={{ height: loadingMoreResult ? '580px' : '600px', overflowY: 'auto' }} ref={containerRef}>
            <CampaignsCard
              handleDelete={handleDeleteCampaign}
              handleCardClick={handleCampaignCardClick}
              filteredCampaigns={filteredCampaigns}
            />
          </div>
          )}
        {
            !filteredCampaigns && isDataLoading && (
              <div className="pt-20">
                <Skeleton />
              </div>
            )
          }
        {openNewCampaignModal && (
        <NewCampaignModal
          handleOk={handleCreateOrgStep1}
          isLoading={isNewCampaignLoading}
        />
        )}
      </div>
      {loadingMoreResult && (
      <div
        className="flex justify-center items-center"
      >
        <span
          style={{
            fontSize: '12px',
            lineHeight: '15px',
            color: '#9E9E9E',
          }}
        >
          Loading next 15 results
        </span>
      </div>
      )}
    </div>
  );
}
