import Layout from '@/modules/layout/components/layout';
console.log("routes");
const MembershipPage = () =>
  import('@/modules/membership/components/membership-page.vue');

export default [
  {
    path: '',
    exact: true,
    component: Layout,
    children: [
      {
        name: 'membership',
        path: '/membership',
        component: MembershipPage,
        exact: true,
        meta: { auth: true },
      },
    ],
  },
];
