<template>
  <article class="w-11/12 mx-auto max-w-[70rem] mt-10">
    <header>
      <!-- TODO: Profile Picture -->
      <h1 class="text-white text-4xl font-bold inline-block">
        {{ userInfo.username }}
      </h1>
    </header>
    <hr class="my-4 border-2" />
    <section>
      <h2 class="text-white font-bold text-3xl">TierLists</h2>
      <user-tierlists />
    </section>
  </article>
</template>

<script lang="ts">
import UserTierlists from "@/components/UserTierlists.vue";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "ProfileView",
  components: {
    UserTierlists,
  },
  computed: {
    ...mapState(["userInfo"]),
    getTiers() {
      return JSON.parse(window.sessionStorage.getItem("savedTier") ?? "[]");
    },
  },
});
</script>
