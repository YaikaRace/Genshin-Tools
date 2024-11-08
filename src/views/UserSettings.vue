<template>
  <div>
    <div class="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 class="text-4xl font-bold text-white mb-4">Update Account Info</h1>
      <form @submit.prevent="updateInfo" class="md:w-11/12 md:max-w-sm">
        <div class="form-item">
          <input type="text" name="username" id="username" v-model="username" />
          <label for="username">New Username</label>
        </div>
        <div class="form-item">
          <input type="email" name="email" id="email" v-model="email" />
          <label for="email">New Email</label>
        </div>
        <strong v-if="error" class="text-red-500 mb-4 block font-bold"
          >Error: {{ error }}</strong
        >
        <button
          type="submit"
          :disabled="loading"
          class="bg-purple-600 min-h-10 w-full text-white font-bold py-2 rounded-lg disabled:bg-purple-900 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Update</span>
          <span v-else class="h-full"
            ><font-awesome-icon
              icon="fa-solid fa-spinner"
              spin-pulse
              class="max-h-full"
          /></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import isEmail from "@/utils/isEmail";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "UserSettings",
  data() {
    return {
      username: "",
      email: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    async updateInfo() {
      this.error = "";
      const baseURL = process.env.VUE_APP_API_URL;
      if (!baseURL) return;
      this.loading = true;
      if (this.username === "" && this.email === "") {
        this.$router.replace({ name: "home" });
      }
      if (this.username !== "" && this.username.length < 3) {
        this.error = "Username is invalid";
        this.loading = false;
        return;
      }
      if (this.email !== "" && isEmail(this.email)) {
        this.error = "Email is invalid";
        this.loading = false;
        return;
      }
      try {
        const data = await fetch(baseURL + "/user/info/me", {
          method: "PATCH",
          credentials: "include",
          headers: {
            "x-access-key": process.env.VUE_APP_ACCESS_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email ? this.email : this.userInfo.email,
          }),
        });
        const json = await data.json();
        if (json.success !== undefined && !json.success) {
          store.commit("setUserInfo", null);
          this.loading = false;
          this.error = json.message;
          return;
        } else {
          store.commit("setUserInfo", json);
          this.loading = false;
          this.$router.replace({ name: "home" });
        }
      } catch (error) {
        store.commit("setUserInfo", null);
        this.error = "Update server is not available";
        this.loading = false;
        return;
      }
      this.$router.replace({ name: "home" });
    },
  },
  computed: {
    ...mapState(["userInfo"]),
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
