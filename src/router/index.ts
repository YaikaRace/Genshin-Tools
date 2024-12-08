import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      title: "Home",
    },
  },
  {
    path: "/tiermaker",
    name: "tiermaker",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      title: "Tier Maker",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/SignIn.vue"),
    meta: {
      title: "Sign In",
      onlyNotLogged: true,
    },
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: async () => {
      window.sessionStorage.setItem("userData", "null");
      const baseUrl = process.env.VUE_APP_API_URL;
      if (!baseUrl) return false;
      const result = await fetch(baseUrl + "/user/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "x-access-key": process.env.VUE_APP_ACCESS_KEY,
        },
      });
      const json = await result.json();
      if (json.success !== undefined && json.success) {
        store.commit("setUserInfo", null);
      }
      router.replace({ name: "home" });
    },
    component: () => import("@/views/HomeView.vue"),
    meta: {
      title: "Log Out",
      requireAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/SignUp.vue"),
    meta: {
      title: "Sign Up",
      onlyNotLogged: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: {
      title: "Profile",
      requireAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/UserSettings.vue"),
    meta: {
      title: "Settings",
      requireAuth: true,
    },
  },
  {
    path: "/tierlist/:tierId",
    name: "tierlist",
    component: () => import("@/views/TierlistViewer.vue"),
    meta: {
      title: "Tierlist",
    },
  },
  {
    path: "/tierlist/share/:sharedTier",
    component: () => import("@/views/TierlistViewer.vue"),
    props: { isShared: true },
    meta: {
      title: "Tierlist",
    },
  },
  {
    path: "/tierlist/:tierId",
    component: () => import("@/views/TierlistViewer.vue"),
    meta: {
      title: "Tierlist",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      title: "Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  document.title = `${to.meta.title} - Genshin Tools`;
  try {
    if (!store.state.loggedIn && to.meta.requireAuth) {
      return next({ name: "login" });
    }
    if (store.state.loggedIn && to.meta.onlyNotLogged)
      return next({ name: "home" });
  } catch {
    if (to.meta.requireAuth) {
      return next({ name: "login" });
    }
  }
  next();
});

export default router;
