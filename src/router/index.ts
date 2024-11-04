import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/tiermaker",
    name: "tiermaker",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/SignIn.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  const baseUrl = process.env.VUE_APP_API_URL;
  if (!baseUrl) return false;
  const data = await fetch(baseUrl + "/user/auth/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "x-access-key": process.env.VUE_APP_ACCESS_KEY,
    },
  });
  console.log(await data.json());
  next();
});

export default router;
