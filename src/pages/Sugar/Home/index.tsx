import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, Link } from '@umijs/max';
import styles from './index.less';
import { useEffect } from 'react';
import { sourceList } from '@/api/source';
import { Button } from 'antd';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie'

const SugarHomePage: React.FC = () => {
  const { name, token } = useModel('global');

  // useEffect(() => {
  //
  //   console.log('srouce list',name, token, sourceList())
  //
  // }, [])

  const testClick = () => {
    sourceList()
  }


  return (
    <PageContainer ghost>
      <div className={styles.container}>
        galaxy home  daddddd
        <Guide name={trim(name)} />
        <Button type={'primary'} onClick={testClick}>获取数据源列表</Button>
      </div>
    </PageContainer>
  );
};

export default SugarHomePage;