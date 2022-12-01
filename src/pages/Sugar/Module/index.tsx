import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, Link } from '@umijs/max';
import styles from './index.less';
import { useEffect } from 'react';
import { sourceList } from '@/api/source';
import { Button } from 'antd';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';
import { componentList } from '@/api/component';

const SugarModule: React.FC = () => {
  const { name, token } = useModel('global');

  const getCompList = async () => {
    let res = await componentList();
    console.log('component', res);
  }


  // @ts-ignore
  useEffect(() => {
    (async function () {
      let res = await componentList();
      console.log('component', res);
    })()

  },[])


  return (
    // <PageContainer ghost>
    <div className={styles.container}>
      <Button type={'primary'} onClick={getCompList}>请求</Button>



    </div>
    // </PageContainer>
  );
};

export default SugarModule;