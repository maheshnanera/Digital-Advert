import React, { useEffect, useState } from 'react';
import '../account.css';
import { useDispatch, useSelector } from 'react-redux';
import OrgMembersTable from './OrgMembersTable';
import MemberSubHeader from './MemberSubHeader';
import MemberHeader from './MemberHeader';
import AddMemberModal from './AddMemberModal';
import { getOrganizationByUserCustom, getOrganizationMembers } from '../../../User/UserActions';
import { setOrganizationMembers } from '../../../store/slices/portalSlice';

export default function Members() {
  const {
    openInviteMember,
    organizationMembers,
  } = useSelector((state) => state?.portal);
  const { currentUser } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchOrgMembers = async () => {
    const data = await getOrganizationByUserCustom(currentUser.sub);
    // Add condition to set the role = Root to org
    // const rootIndex = data?.items?.findIndex((item) => item?.role === 'ROOT');
    // const orgId = rootIndex !== -1
    //   ? data.items[rootIndex].organization.id : data.items[0].organization.id;
    const orgMember = await getOrganizationMembers(data?.items?.[0].organization.id);
    dispatch(setOrganizationMembers(orgMember.items));
    setLoading(false);
  };

  useEffect(() => {
    fetchOrgMembers();
  }, []);

  return (
    <div className="flex flexColumn h-full">
      <MemberHeader />
      <MemberSubHeader />
      <div className="mt-10 overflow-auto">
        {(!loading && organizationMembers?.length > 0) && <OrgMembersTable />}
      </div>
      {openInviteMember && <AddMemberModal />}
    </div>
  );
}
