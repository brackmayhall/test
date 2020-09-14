import Vue from "vue";
import VueRouter from "vue-router";

import { Auth } from 'aws-amplify'

import Home from "../views/Home.vue";
import FundManager from '../views/FundManager.vue'
import AuthComponent from '../views/Auth.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "auth",
    component: AuthComponent,
    meta: { requiresAuth: false }
  },
  {
    path: "/fundmanager",
    name: "fundmanager",
    component: FundManager,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Auth.currentAuthenticatedUser().then(() => {
      next()
    }).catch(() => {
      next({
        path: '/login'
      });
    });
  }
  next()
})

export default router
