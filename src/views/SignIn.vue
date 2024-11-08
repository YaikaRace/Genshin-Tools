<template>
  <div class="min-h-screen w-full flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold text-white mb-4">Sign In</h1>
    <form @submit.prevent="signin" class="md:w-11/12 md:max-w-sm">
      <div class="form-item">
        <input
          type="text"
          name="username"
          id="username"
          v-model="username"
          required
        />
        <label for="username">Username</label>
      </div>
      <div class="form-item">
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          required
        />
        <label for="password">Password</label>
      </div>
      <strong v-if="error" class="text-red-500 mb-4 block font-bold"
        >Error: {{ error }}</strong
      >
      <button
        type="submit"
        :disabled="loading"
        class="bg-purple-600 min-h-10 w-full text-white font-bold py-2 rounded-lg disabled:bg-purple-900 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <span v-if="!loading">Sign In</span>
        <span v-else class="h-full"
          ><font-awesome-icon
            icon="fa-solid fa-spinner"
            spin-pulse
            class="max-h-full"
        /></span>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    async signin() {
      this.error = "";
      const baseURL = process.env.VUE_APP_API_URL;
      if (!baseURL) return;
      this.loading = true;
      if (this.username.length < 3) {
        this.error = "Username or Password is invalid";
        this.loading = false;
        return;
      }
      try {
        const endpoint = `${baseURL}/user/auth/login`;
        const response = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
          headers: {
            "x-access-key": process.env.VUE_APP_ACCESS_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        const json = await response.json();
        if (json.success !== undefined && !json.success) {
          this.error = "Username or Password is invalid";
          this.loading = false;
          return;
        }
      } catch {
        this.error = "Login server is not available";
      }
      try {
        const data = await fetch(baseURL + "/user/info/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "x-access-key": process.env.VUE_APP_ACCESS_KEY,
          },
        });
        const json = await data.json();
        if (json.success !== undefined && !json.success) {
          store.commit("setUserInfo", null);
        } else {
          store.commit("setUserInfo", json);
        }
      } catch (error) {
        store.commit("setUserInfo", null);
      }
      this.$router.replace({ name: "home" });
    },
  },
});
</script>

<style lang="postcss" scoped>
.form-item {
  @apply relative my-4;
}
input {
  @apply w-full border-solid border-2 border-gray-500 px-2 py-1 bg-slate-900 text-white caret-white transition-colors duration-200 rounded-lg;
}
input:focus {
  @apply border-purple-600 outline-none;
}
label {
  @apply absolute left-2 top-1 text-gray-500 font-medium cursor-text transition-all duration-200;
}
input:focus + label {
  @apply text-purple-600 font-semibold;
}
input:focus + label,
input:valid + label {
  @apply -top-3 bg-slate-800 text-xs;
}
</style>
