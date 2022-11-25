import { defineConfig } from '@umijs/max';

export default defineConfig({
  // antd: {
  //   // configProvider
  //   // configProvider: {
  //   //
  //   // },
  //   // // themes
  //   // dark: false,
  //   // compact: true,
  //   // // babel-plugin-import
  //   // // import: true,
  //   // // less or css, default less
  //   // style: 'less',
  // },
  access: {},
  model: {},
  initialState: {},
  request: {},
  // layout: {
  //   title: '@umijs/max',
  // },
  qiankun: {
    slave: {},
  },
  history: {
    type: 'hash'
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: '登录页',
      path: '/login',
      component: './Login',
    },
    {
      name: 'Sugar',
      path: '/sugar',
      component: './Sugar/index',
      routes: [
        {
          name: 'SugarHome',
          path: '/sugar/home',
          component: './Sugar/Home'
        },
        {
          name: '',
          path: '/sugar/module',
          component: './Sugar/Module'
        },
        {
          name: '',
          path: '/sugar/application',
          component: './Sugar/Application'
        },
        {
          name: '',
          path: '/sugar/datasource',
          component: './Sugar/DataSource'
        },
      ]
    },

  ],
  npmClient: 'pnpm',
  proxy: {
    '/vapi': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false
    }
  }
});

