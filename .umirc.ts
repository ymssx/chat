import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  exportStatic: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/welcome', component: '@/pages/welcome/index' },
  ],
  fastRefresh: {},
});
