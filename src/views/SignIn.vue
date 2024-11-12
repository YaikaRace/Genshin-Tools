<template>
  <div class="min-h-screen w-full flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold text-white mb-4">Sign In</h1>
    <form @submit.prevent="signin" class="md:w-11/12 md:max-w-sm">
      <form-input
        v-model="username"
        type="text"
        name="Username"
        :error="errors.username"
        @focused="errors.username = ''"
        required
      />
      <form-input
        v-model="password"
        type="password"
        name="Password"
        :error="errors.password"
        @focused="errors.password = ''"
        required
      />
      <strong v-if="errors.error" class="text-red-400 mb-4 block font-bold"
        >Error: {{ errors.error }}</strong
      >
      <strong v-if="signup" class="text-green-400 mb-4 block font-bold"
        >You have successfully Registered, you must now Log In</strong
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
import FormInput from "@/components/forms/FormInput.vue";
import store from "@/store";
import { defineComponent } from "vue";

interface SignInErrors {
  [key: string]: string;
  username: string;
  password: string;
  error: string;
}

export default defineComponent({
  name: "SignIn",
  components: {
    FormInput,
  },
  data() {
    return {
      username: "",
      password: "",
      errors: {
        username: "",
        password: "",
        error: "",
      } as SignInErrors,
      loading: false,
      signup: Boolean(this.$route.query.success),
    };
  },
  methods: {
    async signin() {
      for (const key of Object.keys(this.errors)) {
        this.errors[key] = "";
      }
      const baseURL = process.env.VUE_APP_API_URL;
      if (!baseURL) return;
      if (this.username.length < 3) {
        this.errors.username = "Username is invalid";
      }
      if (this.password.length < 6) {
        this.errors.password = "Password is invalid";
      }
      for (const key of Object.keys(this.errors)) {
        if (this.errors[key] !== "") {
          return;
        }
        continue;
      }
      this.loading = true;
      // @ts-expect-error progress
      this.$Progress.start();
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
          this.errors.error = "Username or Password is invalid";
          this.loading = false;
          // @ts-expect-error progress
          this.$Progress.fail();
          return;
        }
      } catch {
        this.errors.error = "Login server is not available, try again later";
        this.loading = false;
        // @ts-expect-error progress
        this.$Progress.fail();
        return;
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
          this.loading = false;
          // @ts-expect-error progress
          this.$Progress.fail();
          return;
        } else {
          store.commit("setUserInfo", json);
          window.sessionStorage.setItem("userData", JSON.stringify(json));
        }
      } catch (error) {
        store.commit("setUserInfo", null);
        this.loading = false;
        // @ts-expect-error progress
        this.$Progress.fail();
        return;
      }
      this.$router.replace({ name: "home" });
      // @ts-expect-error progress
      this.$Progress.finish();
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
