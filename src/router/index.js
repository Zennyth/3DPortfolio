import { createRouter, createWebHistory } from 'vue-router'

import PortfolioLayout from "@/layouts/portfolio/PortfolioLayout"

const routes = [
  {
    path: "/",
    component: PortfolioLayout,
    redirect: "/",
    children: [ 
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes
})

export default router
