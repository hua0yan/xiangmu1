import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/layout/home",
  },
  {
    path: "/layout",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "/layout/home",
        component: () => import("@/views/Home"),
      },
      {
        path: "/layout/findhouse",
        component: () => import("@/views/FindHouse"),
      },
      {
        path: "/layout/news",
        component: () => import("@/views/News"),
      },
      {
        path: "/layout/my",
        component: () => import("@/views/My"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/citylist",
    component: () => import("@/views/cityList"),
  },
  {
    path: "/ispage",
    component: () => import("@/views/isPages")
  }
];

const router = new VueRouter({
  routes,
});

export default router;
