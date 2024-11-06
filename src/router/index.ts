import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import store from "@/store";

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
    meta: {
      onlyNotLogged: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/SignUp.vue"),
    meta: {
      onlyNotLogged: true,
    },
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

router.beforeEach(async (to, _from, next) => {
  const baseUrl = process.env.VUE_APP_API_URL;
  if (!baseUrl) return false;
  try {
    const data = await fetch(baseUrl + "/user/auth/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "x-access-key": process.env.VUE_APP_ACCESS_KEY,
      },
    });
    const json = await data.json();
    if (json.success !== undefined && !json.success && to.meta.requireAuth) {
      store.commit("setUserInfo", null);
      return next({ name: "login" });
    }
    if (json.success !== undefined && !json.success) {
      store.commit("setUserInfo", null);
      return next();
    }
    store.commit("setUserInfo", json);
    if (store.state.loggedIn && to.meta.onlyNotLogged)
      return next({ name: "home" });
  } catch {
    console.log("fetching error");
    if (to.meta.requireAuth) {
      return next({ name: "login" });
    }
  }
  next();
});

export default router;
