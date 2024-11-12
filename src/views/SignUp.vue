<template>
  <div class="min-h-screen w-full flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold text-white mb-4">Sign Up</h1>
    <form
      autocomplete="off"
      @submit.prevent="signup"
      class="md:w-11/12 md:max-w-sm"
    >
      <form-input
        v-model="username"
        type="text"
        name="Username"
        :error="errors.username"
        @focused="errors.username = ''"
      />
      <form-input
        v-model="email"
        type="email"
        name="Email"
        :error="errors.email"
        @focused="errors.email = ''"
      />
      <form-input
        v-model="password"
        type="password"
        name="Password"
        :error="errors.password"
        @focused="errors.password = ''"
      />
      <form-input
        v-model="confirmPassword"
        type="password"
        name="Confirm Password"
        :error="errors.confirmPassword"
        @focused="errors.confirmPassword = ''"
      />
      <strong v-if="errors.error" class="error"
        >Error: {{ errors.error }}</strong
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
import FormInput from "@/components/forms/FormInput.vue";
import isEmail from "@/utils/isEmail";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignUp",
  components: {
    FormInput,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: "",
      } as { [key: string]: string },
      loading: false,
    };
  },
  methods: {
    async signup() {
      const baseURL = process.env.VUE_APP_API_URL;
      if (!baseURL) return;
      for (const key of Object.keys(this.errors)) {
        this.errors[key] = "";
      }
      if (this.username.length < 3) {
        this.errors.username = "Username must be at least 3 characters";
      }
      if (!isEmail(this.email)) {
        this.errors.email = "Invalid Email";
      }
      if (this.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters";
      }
      if (this.password.length > 50) {
        this.errors.password =
          "Password must not contain more than 50 characters";
      }
      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = "Passwords doesn't match";
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
          this.errors.error = json.message;
          this.loading = false;
          // @ts-expect-error progress
          this.$Progress.fail();
          return;
        }
        // @ts-expect-error progress
        this.$Progress.finish();
        this.$router.replace({ name: "login", query: { success: "true" } });
      } catch {
        this.errors.error = "Register server is not available";
        this.loading = false;
        // @ts-expect-error progress
        this.$Progress.fail();
      }
    },
  },
});
</script>
