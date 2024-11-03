<template>
  <div class="min-h-screen w-full flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold text-white mb-4">Sign Up</h1>
    <form autocomplete="off" @submit.prevent="signup">
      <div class="form-item">
        <input type="text" name="username" id="username" required />
        <label for="username">Username</label>
      </div>
      <div class="form-item">
        <input type="password" name="password" id="password" required />
        <label for="password">Password</label>
      </div>
      <div class="form-item">
        <input type="password" name="cpassword" id="cpassword" required />
        <label for="cpassword">Confirm Password</label>
      </div>
      <button
        type="submit"
        class="bg-purple-600 w-full text-white font-bold py-2 rounded-lg"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignUp",
  methods: {
    signup() {
      this.$router.replace({ name: "home" });
      const baseURL = process.env.VUE_APP_API_URL;
      if (!baseURL) return;
    },
  },
});
</script>

<style lang="postcss" scoped>
.form-item {
  @apply relative my-4;
}
input {
  @apply border-solid border-2 border-gray-500 px-2 py-1 bg-slate-900 text-white caret-white transition-colors duration-200 rounded-lg;
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
