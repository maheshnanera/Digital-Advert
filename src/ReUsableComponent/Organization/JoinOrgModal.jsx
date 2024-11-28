import React, { useState } from 'react';
import {
  Modal, Button, List, Avatar,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateOrganizationRole, getOrganizationByUserCustom } from '../../User/UserActions';
import { setOrganization } from '../../store/slices/portalSlice';
import { setOpenJoinOrgModal } from '../../store/slices/orgSlice';

function JoinOrgModal() {
  const { currentUser } = useSelector((state) => state.loginReducer);
  const { openJoinOrgModal, userOrganizations } = useSelector((state) => state?.organization);
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();

  const fetchOrgDetail = async () => {
    const data = await getOrganizationByUserCustom(currentUser.sub);

    // Add condition to set the role = Root to org
    const rootIndex = data?.items?.findIndex((item) => item?.role === 'ROOT');
    const orgData = rootIndex !== -1
      ? data.items[rootIndex].organization : data.items[0].organization;
    dispatch(setOrganization(orgData));
  };

  const handleJoinOrg = async (orgId) => {
    setLoading(orgId);
    const inputData = {
      id: orgId,
      isActivated: true,
    };
    await UpdateOrganizationRole(inputData);
    await fetchOrgDetail();
    setLoading(null);
    dispatch(setOpenJoinOrgModal(false));
  };

  return (
    <Modal
      title="Join an Organization"
      open={openJoinOrgModal}
      footer={null}
      closable={false}
    >
      <List
        itemLayout="horizontal"
        dataSource={userOrganizations}
        renderItem={(org) => (
          <List.Item>
            <List.Item.Meta
              avatar={
          org?.organization?.photo ? (
            <Avatar src={org?.organization?.photo} />
          ) : (
            <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}>
              {org?.organization?.organizationName.charAt(0).toUpperCase()}
            </Avatar>
          )
    }
              title={<a href="#">{org?.organization?.organizationName}</a>}
              description="Description of the organization"
            />
            {console.log('org', org)}
            <Button
              type="primary"
              onClick={() => handleJoinOrg(org?.id)}
              loading={loading === org.id}
              disabled={loading === org.id}
            >
              Join Organization
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
}

export default JoinOrgModal;
