// 运行时配置
// import { setCreateHistoryOptions } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };


export const qiankun = {
  // 子应用在挂载完成时，打印 props 信息
  async afterMount(props: any) {
    console.log('after', props);
  },
  async bootstrap(props: any) {
    const basename = props?.basename;
    console.log('qiankun bootstrap');
    // if (basename) setCreateHistoryOptions({ basename });
  },
};
