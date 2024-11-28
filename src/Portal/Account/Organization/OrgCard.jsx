import { DeleteOutlined } from '@ant-design/icons';
import {
  Avatar, Col, Row, Button,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateOrganizationRole, getOrganizationByUserCustom } from '../../../User/UserActions';
import { setUserOrganizations } from '../../../store/slices/orgSlice';

function OrgCard(props) {
  const { orgItem } = props;
  const [loading, setLoading] = useState(null);
  const { currentUser } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const fetchOrgDetail = async () => {
    const data = await getOrganizationByUserCustom(currentUser.sub);
    dispatch(setUserOrganizations(data?.items));
  };

  const handleJoinOrg = async (orgId) => {
    setLoading(orgId);
    const inputData = {
      id: orgId,
      isActivated: true,
    };
    await UpdateOrganizationRole(inputData);
    fetchOrgDetail();
    setLoading(null);
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: '10px 20px', border: '1px solid #d9d9d9', borderRadius: '8px' }}>
      <Col sm={18} xs={22} className="items-center" style={{ gap: '10px', display: 'flex' }}>
        {
     orgItem?.organization?.photo ? (
       <Avatar shape="square" size={40} src={orgItem?.organization?.photo} />
     ) : (
       <Avatar shape="square" size={40}>{orgItem?.organization?.organizationName?.charAt(0)}</Avatar>
     )
    }
        <div className="flex flexColumn">
          <div className="font-medium" style={{ fontSize: '16px' }}>
            {' '}
            {orgItem?.organization?.organizationName}
            {' '}
          </div>
          <div>{orgItem?.role}</div>
        </div>
      </Col>
      {orgItem?.role !== 'ROOT' && orgItem?.isActivated && (
      <Col sm={2} xs={2} style={{ textAlign: 'center', alignSelf: 'center' }}>
        <DeleteOutlined />
      </Col>
      )}
      {!orgItem?.isActivated
    && (
    <Col sm={5} xs={5} style={{ textAlign: 'center', alignSelf: 'center' }}>
      <Button
        type="primary"
        onClick={() => handleJoinOrg(orgItem?.id)}
        loading={loading === orgItem.id}
        disabled={loading === orgItem.id}
      >
        Join Organization
      </Button>
    </Col>
    )}
    </Row>
  );
}

export default OrgCard;
