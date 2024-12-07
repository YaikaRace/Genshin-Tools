<template>
  <article>
    <tierlist-component
      :key="index"
      v-for="(tierlist, index) in tierlists"
      :readonly-tiers="tierlist.tiers"
    />
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
      tierlists: [] as { tiers: [] }[],
    };
  },
  async created() {
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
    } catch {
      console.log("Error getting tierlists");
    }
  },
});
</script>
