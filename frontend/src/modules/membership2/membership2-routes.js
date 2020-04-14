import Layout from '@/modules/layout/components/layout';
console.log("routes");
const MembershipPage2 = () =>
  import('@/modules/membership2/components/membership2-page.vue');

export default [
  {
    path: '',
    exact: true,
    component: Layout,
    children: [
      {
        name: 'membership2',
        path: '/membership2',
        component: MembershipPage2,
        exact: true,
        meta: { auth: true },
      },
    ],
  },
];
