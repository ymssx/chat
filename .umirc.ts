import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  exportStatic: {},
  routes: [
    {
      exact: false, path: '/', component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/request', component: '@/pages/request/index' },
        { path: '/welcome', component: '@/pages/welcome/index' },
      ],
    }
  ],
  fastRefresh: {},
});
