// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import { getToken, setToken as setCookieToken } from '@/utils/auth';

const useGlobal: any = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [token, setToken] = useState<string>();
  const [menu, setMenu] = useState([{name: '组件', path: '/sugar/comp'},{name: '数据源', path: '/sugar/source'}]);

  const loginAction = () => {
    console.log('login and setToken', getToken());
    setToken(getToken())
    // setCookieToken(getToken())
  }

  return {
    name,
    setName,
    token,
    setToken,
    menu,
    setMenu,
    loginAction,
  };
};

export default useGlobal;
