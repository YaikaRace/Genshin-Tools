<template>
  <article class="w-11/12 max-w-[70rem] mx-auto mt-10 scale-[.85]">
    <tierlist-component :readonly-tiers="getTiers" />
  </article>
</template>

<script lang="ts">
import TierlistComponent from "@/components/TierlistComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TierlistViewer",
  components: {
    TierlistComponent,
  },
  computed: {
    getTiers() {
      return (
        this.getSharedTier ??
        JSON.parse(window.sessionStorage.getItem("savedTier") ?? "[]")
      );
    },
    getSharedTier() {
      if (!this.$route.params.sharedTier) {
        return null;
      }
      const data = atob(this.$route.params.sharedTier as string);
      console.log(JSON.parse(data));
      return JSON.parse(data);
    },
  },
});
</script>
