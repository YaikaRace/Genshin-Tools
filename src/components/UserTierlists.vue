<template>
  <article>
    <section class="flex gap-5">
      <router-link
        :key="index"
        v-for="(tierlist, index) in tierlists"
        :to="{ name: 'tierlist', params: { tierId: tierlist._id } }"
        class="min-w-full"
      >
        <tierlist-component :readonly-tiers="tierlist.tiers" />
      </router-link>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TierlistComponent from "./TierlistComponent.vue";

export default defineComponent({
  name: "UserTierlists",
  components: {
    TierlistComponent,
  },
  data() {
    return {
      tierlists: [] as { _id: string; tiers: [] }[],
    };
  },
  async created() {
    const tierlists = window.sessionStorage.getItem("tierlists");
    if (tierlists) {
      this.tierlists = JSON.parse(tierlists);
      return;
    }
    const baseURL = process.env.VUE_APP_API_URL;
    if (!baseURL) return;
    try {
      const result = await fetch(`${baseURL}/tierlist/`, {
        credentials: "include",
        headers: {
          "x-access-key": process.env.VUE_APP_ACCESS_KEY,
        },
      });
      const json = await result.json();
      this.tierlists = json;
      window.sessionStorage.setItem("tierlists", JSON.stringify(json));
    } catch {
      console.log("Error getting tierlists");
    }
  },
});
</script>
