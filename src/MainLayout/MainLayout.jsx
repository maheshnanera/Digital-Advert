/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
import './mainlayout.css';
import {
  Avatar,
  Button,
  Drawer,
  Layout,
  Menu,
  Row,
  Grid,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  UserOutlined,
  SoundOutlined,
  RadarChartOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';
import { signOut } from 'aws-amplify/auth';
import SubMenu from 'antd/lib/menu/SubMenu';
import moment from 'moment';
import { useSelector } from 'react-redux';
import logo from '../assets/IDAPortal.jpeg';
import { getUserAction } from '../User/UserActions';
import { GetFileFromS3 } from '../ReUsableFunctions/UploadFile';

const CURRENT_VERSION = '0.0.1';

export default function MainLayout(props) {
  const history = useHistory();
  const location = useLocation();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const {
    Sider, Header, Content, Footer,
  } = Layout;
  const [collapsed, setCollpased] = useState(false);

  const [selectedKey, setSelectedKey] = useState('');

  const { currentUser } = useSelector(
    (state) => state.loginReducer,
  );

  const initialHeaderMenu = [
    {
      name: 'Campaigns',
      path: '/',
      key: 'campaigns',
      icon: <SoundOutlined />,
    },
    {
      name: 'Gallery',
      path: '/gallery',
      key: 'gallery',
      icon: <AlignLeftOutlined />,
    },
    currentUser['cognito:groups']?.includes('SUPERADMIN') && {
      name: 'Super Admin',
      key: 'admin',
      icon: <UserOutlined />,
      subMenu: [
        {
          name: 'Devices',
          path: '/location',
          key: 'location',
          icon: <RadarChartOutlined />,
        },
        {
          name: 'Venue Catalog',
          path: '/venues',
          key: 'venue',
          icon: <RadarChartOutlined />,
        },
      ],
    },
  ];

  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case '/':
        setSelectedKey('campaigns');
        break;
      default:
        const accountIndex = path.indexOf('/account/');
        if (accountIndex !== -1) {
          setSelectedKey(path.slice(accountIndex + '/account/'.length));
        } else {
          setSelectedKey(path.replace('/', ''));
        }
        break;
    }
  }, [location]);

  const handleSignOut = async () => {
    try {
      await signOut({ global: false });
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error in sign out:', error);
    }
  };

  const [openKeys, setOpenKeys] = useState([]);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleChangeProfileOption = (option = 'profile') => {
    setShowDropDownMenu(false);
    history.push(`/account/${option}`);
  };

  // sidebar drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [imageUrl, setImageUrl] = useState(null);
  const [userData, setUserData] = useState({});

  const fetchUserDetail = async () => {
    const data = await getUserAction(currentUser.sub);
    setUserData(data);
  };

  useEffect(() => {
    fetchUserDetail();
  }, [currentUser]);

  useEffect(() => {
    const getImage = async () => {
      if (userData.photo) {
        const link = await GetFileFromS3(userData.photo);
        setImageUrl(link.url);
      }
    };
    if (imageUrl === null || imageUrl === undefined) {
      getImage();
    }
  }, [userData]);

  return (
    <>
      <Layout className="layout">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={() => {}}
          onCollapse={(collapsed) => {
            setCollpased(collapsed);
          }}
          width="250px"
          className="sidebar desktop-sidebar"
          collapsed={screens.xs && collapsed}
        >
          <div className="text-center" style={{ padding: '20px 0px' }}>
            <img src={logo} alt="" height="60px" width="100%" />
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={selectedKey}>
            {initialHeaderMenu?.map((item) => (item?.subMenu?.length ? (
              <SubMenu
                key={item.key}
                icon={item.icon}
                id={item.key}
                title={item?.name}
              >
                {item.subMenu.map((subItem) => (
                  <Menu.Item key={subItem.key} icon={subItem?.icon}>
                    <Link
                      to={subItem.path}
                      onClick={() => {
                        setCollpased(true);
                        setOpen(false);
                      }}
                    >
                      {' '}
                      {subItem.name}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (item
              && (
              <Menu.Item key={item?.key} icon={item?.icon} id={item?.key}>
                <Link
                  to={item?.path}
                  onClick={() => {
                    setCollpased(true);
                    setOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </Menu.Item>
              )
            )))}
          </Menu>
          <Footer
            className={
       screens.xs
         ? collapsed
           ? 'footer ant-footer-inline-collapsed'
           : 'footer ant-footer-inline'
         : 'footer ant-footer-inline'
      }
          >
            <br />
            Version
            {' '}
            {CURRENT_VERSION}
            {' '}
            | &copy;
            {moment().year()}
            {' '}
            |
            <br />
            *Any unethical use/attempt will result in termination
          </Footer>
        </Sider>

        <Drawer
          title={<img src={logo} alt="" height="60" className="w-100" />}
          placement="left"
          onClose={onClose}
          open={open}
          className="layout"
          closable
        >
          <div className="sidebar">
            <Menu theme="dark" mode="inline" selectedKeys={selectedKey}>
              {initialHeaderMenu?.map((item) => (item?.subMenu?.length ? (
                <SubMenu
                  key={item.key}
                  icon={item.icon}
                  id={item.key}
                  title={item?.name}
                >
                  {item.subMenu.map((subItem) => (
                    <Menu.Item key={subItem.key} icon={subItem?.icon}>
                      <Link
                        to={subItem.path}
                        onClick={() => {
                          setCollpased(true);
                          setOpen(false);
                        }}
                      >
                        {' '}
                        {subItem.name}
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (item
                && (
                <Menu.Item key={item.key} icon={item.icon} id={item.key}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setCollpased(true);
                      setOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                </Menu.Item>
                )
              )))}
            </Menu>
            <Footer
              className={
        screens.xs
          ? collapsed
            ? 'footer ant-footer-inline-collapsed'
            : 'footer ant-footer-inline'
          : 'footer ant-footer-inline'
       }
            >
              <br />
              Version
              {' '}
              {CURRENT_VERSION}
              {' '}
              | &copy;
              {moment().year()}
              {' '}
              |
              <br />
              *Any unethical use/attempt will result in termination
            </Footer>
          </div>
        </Drawer>

        <Layout className="layout">
          <Header className="main-haeder" style={{ padding: '0px 20px' }}>
            <Row
              className="layout-header-row"
              align="middle"
              justify="space-between"
            >
              <Row align="middle">
                <Button
                  type="text"
                  onClick={showDrawer}
                  className="mobile-menu fs-16 mr-10"
                >
                  {' '}
                  red
                  <MenuUnfoldOutlined />
                </Button>
              </Row>

              <Row>

                <div>
                  {imageUrl ? (
                    <img
                      onClick={() => setShowDropDownMenu(!showDropDownMenu)}
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '33px',
                        cursor: 'pointer',
                      }}
                    />
                  ) : (
                    <Avatar shape="square" className="cursor-pointer" size={45} icon={<UserOutlined />} onClick={() => setShowDropDownMenu(!showDropDownMenu)} />
                  )}
                  {showDropDownMenu && (
                  <Menu

                    style={{
                      width: 200,
                      position: 'absolute',
                      right: '10px',
                      zIndex: 1,
                      border: '1px solid rgb(242, 101, 57, .5)',
                      borderRadius: '4px',
                    }}
                    visible={false}
                    className="dropdown-container"
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                  >
                    <Menu.Item key="profile" onClick={() => handleChangeProfileOption('profile')}>
                      Profile
                    </Menu.Item>
                    <SubMenu key="account" title="Account">
                      <Menu.Item key="billing" onClick={() => handleChangeProfileOption('billing')}>
                        Billing
                      </Menu.Item>
                      <Menu.Item key="members" onClick={() => handleChangeProfileOption('members')}>
                        Members
                      </Menu.Item>
                      <Menu.Item key="organization" onClick={() => handleChangeProfileOption('orgs')}>
                        Organization
                      </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="signout" onClick={handleSignOut}>
                      Sign out
                    </Menu.Item>
                  </Menu>
                  )}
                </div>
              </Row>
            </Row>
          </Header>
          <Content
            style={{
              padding: '0 50px',
            }}
          >
            <div className="site-layout-content">{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
