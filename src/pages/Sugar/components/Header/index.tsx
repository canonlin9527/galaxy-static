import {
  AppstoreAddOutlined,
  DashboardOutlined, DatabaseOutlined,
  HomeOutlined,
  SettingOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { history } from '@umijs/max';
import React, { useState } from 'react';

const items: MenuProps['items'] = [
  {
    label: '首页',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: '应用',
    key: 'application',
    icon: <DashboardOutlined />,
  },
  {
    label: '组件',
    key: 'module',
    icon: <AppstoreAddOutlined />,
    disabled: false,
  },
  {
    label: '数据源配置',
    key: 'datasource',
    icon: <DatabaseOutlined />,
    disabled: false,
  },
  // {
  //   label: '系统设置',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         {
  //           label: 'Option 1',
  //           key: 'setting:1',
  //         },
  //         {
  //           label: 'Option 2',
  //           key: 'setting:2',
  //         },
  //       ],
  //     },
  //   ],
  // },
];

const SugarHeader: React.FC = () => {
  const [current, setCurrent] = useState('component');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    history.push(`/sugar/${e.key}`);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />;

};

export default SugarHeader;