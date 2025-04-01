import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import('@/views/UserListView.vue'),
  },
  {
    path: '/users/new',
    name: 'AddUser',
    component: () => import('@/views/AddUserView.vue'),
  },
  {
    path: '/users/:id/edit',
    name: 'UserEdit',
    component: () => import('@/views/EditUserView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export { routes }
export default router
