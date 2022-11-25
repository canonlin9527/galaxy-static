import { PageContainer } from '@ant-design/pro-components';
import { useModel, Outlet } from '@umijs/max';
import { useEffect } from 'react';
import { sourceList } from '@/api/source';
import { ConfigProvider, Breadcrumb, Layout, Menu } from 'antd';
import SugarHeader from '@/pages/Sugar/components/Header';
import SugarBreadcrumb from '@/pages/Sugar/components/Breadcrumb';
import styles from './index.less'
const { Header, Content, Footer } = Layout;

const Sugar: React.FC = (props: any) => {
  // const [menu, setMenu] = useS
  // const

  useEffect(() => {
  }, []);
  // const onMenuClick = ({ item, key, keyPath, domEvent }) => {
  //   console.log('onMenuClick', item, key, keyPath, domEvent);
  // }

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className='logo' />
        <SugarHeader/>
      </Header>
      <Content className={styles.siteLayoutContent} style={{ padding: '0 50px', minHeight:'500px', height: '90vh' }}>
        {/*<SugarBreadcrumb/>*/}
        {/*<div className={styles.siteLayoutContent}>*/}
        {/*  <ConfigProvider csp={{ nonce: 'YourNonceCode' }} direction='ltr'>*/}
            <Outlet />
          {/*</ConfigProvider>*/}
        {/*</div>*/}
      </Content>
      {/*<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>*/}
    </Layout>
  );
};

export default Sugar;