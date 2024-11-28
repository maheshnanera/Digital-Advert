import React, { useState } from 'react';
import '../account.css';
import {
  Button, Col, Input, Row,
} from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { Amplify } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import UploadImage from '../../../ReUsableComponent/UploadImage';
import OrgCard from './OrgCard';
import { UpdateOrganization } from '../../../User/UserActions';
import config from '../../../amplifyconfiguration.json';
import { setOrganization } from '../../../store/slices/portalSlice';

Amplify.configure(config);

export default function Organization() {
  const dispatch = useDispatch();

  const { organization } = useSelector(
    (state) => state.portal,
  );
  const { userOrganizations } = useSelector((state) => state?.organization);

  const [orgName, setOrgName] = useState(organization?.organizationName);

  const handleUpdateOrg = async (fieldToUpdate, fieldValue) => {
    const inputData = {
      id: organization.id,
      [fieldToUpdate]: fieldValue,
    };
    const updateOrgData = { ...organization, [fieldToUpdate]: fieldValue };
    dispatch(setOrganization(updateOrgData));
    UpdateOrganization(inputData);
  };

  return (
    < >
      <div className="page-header">Organizations</div>
      <div className="flex justify-center items-center portal-input">
        <Col sm={14} xs={24}>
          <div className="flex justify-center items-center text-center p-30">
            <UploadImage handleUpdateOrgImage={handleUpdateOrg} />
          </div>
          <div>
            <Input placeholder="Organization Name" style={{ height: '40px', fontSize: '16px' }} value={orgName} onChange={(e) => setOrgName(e.target.value)} />
            <Row style={{ marginTop: '20px' }}>
              <Col sm={4} sx={12}>
                <Button
                  type="primary"
                  size="medium"
                  disabled={organization?.organizationName === orgName}
                  block
                  onClick={() => handleUpdateOrg('organizationName', orgName)}
                  loading={false}
                >
                  <span style={{ fontSize: '16px' }}>Save</span>
                </Button>
              </Col>
            </Row>

            <div className="mt-20 mb-10 font-inter" style={{ fontSize: '20px' }}>
              My Organizations
            </div>
            <Row
              style={{
                height: '40px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgb(242, 101, 57, 0.4)',
                borderRadius: '8px',
                padding: '10px',
                gap: '10px',
              }}
            >
              <InfoCircleTwoTone twoToneColor="rgb(242, 101, 57, 0.4)" />
              <span>
                You can be invited as a member to multiple organizations.
              </span>
            </Row>
          </div>
          <div className="mt-20 flex flexColumn" style={{ gap: '8px' }}>
            {userOrganizations?.length > 0 && userOrganizations.map((org) => (
              <OrgCard key={org?.id} orgItem={org} />
            ))}
          </div>
        </Col>

      </div>
    </>
  );
}
