export default [
  {
    path: '/login',
    name: 'LoginUser',
    meta: {
      title: 'Login'
    },
    component: () => import('@/views/auth/LoginUser.vue')
  }
]
