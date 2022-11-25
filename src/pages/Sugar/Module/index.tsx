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

const SugarModule: React.FC = () => {
  const { name, token } = useModel('global');





  return (
    <PageContainer ghost>
      <div className={styles.container}>

      </div>
    </PageContainer>
  );
};

export default SugarModule;