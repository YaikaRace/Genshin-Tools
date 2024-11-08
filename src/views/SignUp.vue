<template>
  <div class="min-h-screen w-full flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold text-white mb-4">Sign Up</h1>
    <form
      autocomplete="off"
      @submit.prevent="signup"
      class="md:w-11/12 md:max-w-sm"
    >
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
        <input type="text" name="email" id="email" v-model="email" required />
        <label for="email">Email</label>
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
      <div class="form-item">
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          v-model="confirmPassword"
          required
        />
        <label for="cpassword">Confirm Password</label>
      </div>
      <strong v-if="error" class="text-red-500 mb-4 block font-bold"
        >Error: {{ error }}</strong
      >
      <button
        type="submit"
        :disabled="loading"
        class="bg-purple-600 w-full text-white font-bold py-2 rounded-lg disabled:bg-purple-900 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <span v-if="!loading">Sign Up</span>
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
import isEmail from "@/utils/isEmail";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    async signup() {
      const baseURL = process.env.VUE_APP_API_URL;
      if (!baseURL) return;
      this.error = "";
      if (this.username.length < 3) {
        this.error = "Username must be at least 3 characters";
        return;
      }
      if (!isEmail(this.email)) {
        this.error = "Invalid Email";
        return;
      }
      if (this.password.length < 6) {
        this.error = "Password must be at least 6 characters";
        return;
      }
      if (this.password.length > 50) {
        this.error = "Password must not contain more than 50 characters";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords doesn't match";
        return;
      }
      this.loading = true;
      try {
        const endpoint = `${baseURL}/user/auth/register`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "x-access-key": process.env.VUE_APP_ACCESS_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });
        const json = await response.json();
        if (json.success !== undefined && !json.success) {
          this.error = json.message;
          this.loading = false;
          return;
        }
        this.$router.replace({ name: "login" });
      } catch {
        this.error = "Register server is not available";
        this.loading = false;
      }
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
