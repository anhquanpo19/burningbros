import type { Router } from "vue-router";

export const authRoute = (router: Router) => {
  router.beforeEach((to, from, next) => {
    next();
  });
};
