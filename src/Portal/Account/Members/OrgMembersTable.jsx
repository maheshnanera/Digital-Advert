import React from 'react';
import {
  Avatar, Card, Col, Row,
} from 'antd';
import '../account.css';
import { MailTwoTone, UnorderedListOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

function OrgMembersTable() {
  const {
    organizationMembers,
    orgMemberSearchQuery, orgMemberFilterType,
  } = useSelector((state) => state?.portal);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const usersWithDetails = organizationMembers.map((item) => ({
    fullName: `${item.user?.email.split('@')[0]}`,
    email: item.user?.email,
    userRole: item.role,
    isActivated: item.isActivated,
    isInvited: item.isInvitedUser,
  }));

  const filteredUsers = usersWithDetails
    ?.filter((user) => {
      const {
        fullName, email,
      } = user;
      if (orgMemberSearchQuery) {
        return `${fullName} ${email}`.toLowerCase().includes(orgMemberSearchQuery.toLowerCase());
      }
      return true;
    })
    ?.sort((a, b) => {
      if (orgMemberFilterType === 'title') {
        return a.fullName.localeCompare(b.fullName);
      } if (orgMemberFilterType === 'status') {
        return a.isInvited.localeCompare(b.isInvited);
      }
      if (orgMemberFilterType === 'email') {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });

  return (
    <Row gutter={[16, 16]}>
      {filteredUsers.map((item) => (
        <Col sm={6} xs={24} key={item.id} className="member-card">
          <Card
            title={<span style={{ fontSize: '14px', color: item.isActivated ? 'green' : 'gray' }}>{item.isActivated ? 'Activated' : 'Deactivated'}</span>}
            extra={<UnorderedListOutlined style={{ color: 'rgb(242, 101, 57, 0.5)', cursor: 'pointer' }} />}
            style={{ borderRadius: '8px' }}
          >
            <div className="flex flexColumn gap-10">
              <div className="flex  items-center gap-15 mb-20">
                <Avatar
                  size={35}
                  style={{
                    backgroundColor: getRandomColor(),
                    verticalAlign: 'middle',
                  }}
                >
                  {item?.fullName.charAt(0)}
                </Avatar>
                <span style={{ fontSize: '15px' }}>{item?.fullName}</span>
              </div>
              <div className="flex flexRow gap-10  pl-4">
                <MailTwoTone style={{ fontSize: '18px' }} twoToneColor="rgb(242, 101, 57, 0.4)" />
                {item.email}
              </div>
              <div className="flex flexRow gap-10  pl-4">
                {' '}
                <span className="py-8" style={{ fontSize: '12px', backgroundColor: 'rgb(153, 153, 153, 0.3)', borderRadius: '20px' }}>{item.userRole}</span>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default OrgMembersTable;
